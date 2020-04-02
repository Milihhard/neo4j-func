import NodeNeo4J from '../models/nodeNeo4j';
import Neo4jCondition from './conditionNeo4j';
import GuidNeo4J from '../utils/neo4jGuid';
import PropertyDefinition from '../models/propertyDefinition';
import Neo4jService from '../neo4j';
import { Record } from 'neo4j-driver/types';
import { Validator } from '../utils/validator';
import ReturnValue from './returnValue';
import { LinkChain, LinkResult } from '../models/linking';
import { isEntity, isPropertyDefinition, isAny } from '../utils/typePredicate';
import ReturnType from './returnType';
import { ReturnTypeEnum } from '../enum/returnTypeEnum';
import ReturnLabel from './returnLabel';
import ReturnResult from './returnResult';
import EntityNeo4J from '../models/entityNeo4j';


export default class Neo4jCommand {
    private _args: any;
    private _command: string[];
    private ret: ReturnValue[];
    private separator: string = '     ';
    private errors: string[] = [];
    private entityUsed: string[] = [];
    private returnLabels: ReturnType[] = [];

    constructor() {
        this._args = {};
        this._command = [];
        this.ret = [];
    }

    match(node: NodeNeo4J | LinkChain): Neo4jCommand {
        return this.globalMatch(node, 'MATCH');
    }

    optionalMatch(node: NodeNeo4J | LinkChain): Neo4jCommand {
        return this.globalMatch(node, 'OPTIONAL MATCH');
    }

    where(value: PropertyDefinition<string>): Neo4jCondition {
        return new Neo4jCondition('WHERE', this, value);
    }

    and(value: PropertyDefinition<string>): Neo4jCondition {
        return new Neo4jCondition('AND', this, value);
    }

    returnValue(value: PropertyDefinition<string> | NodeNeo4J | LinkChain, returnLabel?: string): Neo4jCommand {
        if (isPropertyDefinition(value)) {
            const rightLabel = returnLabel ? returnLabel : value.property
            this.ret.push({
                value: value.getProperty(),
                label: rightLabel
            });
            this.returnLabels.push({ label: rightLabel, returnType: ReturnTypeEnum.PROPERTY });
        } else if (isEntity(value)) {
            const rightLabel = returnLabel ? returnLabel : (value as NodeNeo4J).entityName

            this.ret.push({
                value: (value as NodeNeo4J).guid,
                label: rightLabel
            });
            this.returnLabels.push({ label: rightLabel, returnType: ReturnTypeEnum.NODE });

        } else {
            const linkChain = value as LinkChain;
            const node1 = isAny(linkChain.node1.from) ? '' : this.isEntityUsed(linkChain.node1.from) ? linkChain.node1.from.guid : ':' + linkChain.node1.from.entityName;
            const link = isAny(linkChain.link.from) ? '' : this.isEntityUsed(linkChain.link.from) ? linkChain.link.from.guid : ':' + linkChain.link.from.entityName;
            const node2 = isAny(linkChain.node2.from) ? '' : this.isEntityUsed(linkChain.node2.from) ? linkChain.node2.from.guid : ':' + linkChain.node2.from.entityName;
            const rightLabel = returnLabel ? returnLabel : (linkChain.node1.from.entityName + linkChain.link.from.entityName + linkChain.node2.from.entityName)
            this.ret.push({
                value: `(${node1})-[${link}]->(${node2})`,
                label: rightLabel
            });
            this.returnLabels.push({ label: rightLabel, returnType: ReturnTypeEnum.LINK });
        }
        return this;
    }

    create(value: NodeNeo4J | LinkChain): Neo4jCommand {
        if (isEntity(value)) {
            const node = value as NodeNeo4J;
            const validRes = Validator.validate(node);
            if (!validRes.valid) {
                this.errors.push(`${node.entityName} not valid. Error on: ${validRes.property}`);
            }
            const commandToAdd = `CREATE (${node.guid}:${node.entityName}${this.writeProperties(node)})`
            this._command.push(commandToAdd);
        } else {
            const linkChain = value as LinkChain;
            if (linkChain.node1.property) {
                const validRes = Validator.validate(linkChain.node1.from);
                if (!validRes.valid) {
                    this.errors.push(`${linkChain.node1.from.entityName} not valid. Error on: ${validRes.property}`);
                }
            }
            if (linkChain.node2.property) {
                const validRes = Validator.validate(linkChain.node2.from);
                if (!validRes.valid) {
                    this.errors.push(`${linkChain.node2.from.entityName} not valid. Error on: ${validRes.property}`);
                }
            }
            if (linkChain.link.property) {
                const validRes = Validator.validate(linkChain.link.from);
                if (!validRes.valid) {
                    this.errors.push(`${linkChain.link.from.entityName} not valid. Error on: ${validRes.property}`);
                }
            }

            let commandToAdd = `CREATE (${linkChain.node1.from.guid}`
            if (linkChain.node1.property) {
                commandToAdd += `:${linkChain.node1.from.entityName}${this.writeProperties(linkChain.node1.from)}`;
            }
            commandToAdd += `)-[${linkChain.link.from.guid}`
            if (linkChain.link.property) {
                commandToAdd += `:${linkChain.link.from.entityName}${this.writeProperties(linkChain.link.from)}`;
            }
            commandToAdd += `]->(${linkChain.node2.from.guid}`
            if (linkChain.node2.property) {
                commandToAdd += `:${linkChain.node2.from.entityName}${this.writeProperties(linkChain.node2.from)}`;
            }
            commandToAdd += ')';
            this._command.push(commandToAdd);


        }
        return this;
    }

    private writeProperties(entity: EntityNeo4J): string {
        const propertiesToAdd: string[] = [];
        entity.properties.forEach((value, key) => {
            if (value) {
                const g = GuidNeo4J.create();
                let prop = `${key}: `
                if (value instanceof Date) {
                    prop += `datetime($${g})`;
                    this._args[g] = (value as Date).toISOString();
                } else {
                    prop += `$${g}`;
                    this._args[g] = value;
                }
                propertiesToAdd.push(prop);
            }
        });
        return `{${propertiesToAdd.join(', ')}}`;
    }

    run(): Promise<ReturnResult> {
        if (this.errors.length > 0) {
            return new Promise((resolve, reject) => {
                reject(this.errors);
            });
        }
        return Neo4jService.getInstance().runCommand(this.command, this.args).then(queryResult => {
            return {
                records: queryResult.records.map(r => {
                    const returnValue: ReturnLabel = {};
                    this.returnLabels
                        .forEach((returnLabel) => {
                            returnValue[returnLabel.label] = this.getRightReturn(r, returnLabel);
                        });
                    return returnValue;
                }),
                summary: queryResult.summary,
            }
        });
    }
    logCommand(): {command: string, args: any} {
        return {
            command: this.command,
            args: this.args
        };
    }

    private getRightReturn(record: Record, returnLabel: ReturnType): string | EntityNeo4J | LinkResult {
        const data: any = record.get(returnLabel.label);
        switch (returnLabel.returnType) {
            case ReturnTypeEnum.NODE:
                const instance = EntityFactory.createInstance(data.labels[0], data.properties);
                instance._id = data.identity.low;
                return instance;
            case ReturnTypeEnum.LINK:
                const segment = data[0].segments[0];
                // return segment;
                return {
                    node: {
                        name: segment.start.labels[0],
                        id: segment.start.identity.low,
                        value: EntityFactory.createInstance(segment.start.labels[0], segment.start.properties)
                    },
                    link: {
                        name: segment.relationship.type,
                        id: segment.relationship.identity.low,
                        value: EntityFactory.createInstance(segment.relationship.type, segment.relationship.properties)
                    },
                    to: {
                        name: segment.end.labels[0],
                        id: segment.end.identity.low,
                        value: EntityFactory.createInstance(segment.end.labels[0], segment.end.properties)
                    },
                };
                break;
            case ReturnTypeEnum.PROPERTY:
                return data;
        }
        return data;
    }

    get command(): string {
        let toReturn = this._command.join(this.separator);
        if (this.ret.length > 0) {
            toReturn += this.separator + 'RETURN ' + this.ret.map(r => `${r.value}${r.label ? ` as ${r.label}` : ''}`).join(', ');
        }
        return toReturn;
    }

    get args(): any {
        return this._args;
    }

    addCommand(cmd: string): Neo4jCommand {
        this._command.push(cmd);
        return this;
    }

    setArg(arg: string, value: any): Neo4jCommand {
        this._args[arg] = value;
        return this;
    }

    private globalMatch(value: NodeNeo4J | LinkChain, name: string): Neo4jCommand {
        if (isEntity(value)) {
            this.entityUsed.push(value.guid);
            this._command.push(`${name} (${value.guid}:${value.entityName})`);
        } else {
            const linkChain = value as LinkChain;
            this.entityUsed.push(linkChain.node1.from.guid);
            this.entityUsed.push(linkChain.link.from.guid);
            this.entityUsed.push(linkChain.node2.from.guid);
            this._command.push(`${name} ${this.linkChainToString(linkChain)}`);
        }
        return this;
    }

    private linkChainToString(linkChain: LinkChain): string {
        const node1 = isAny(linkChain.node1.from) ? '' : `${linkChain.node1.from.guid}:${linkChain.node1.from.entityName}`;
        const link = isAny(linkChain.link.from) ? '' : `${linkChain.link.from.guid}:${linkChain.link.from.entityName}`;
        const node2 = isAny(linkChain.node2.from) ? '' : `${linkChain.node2.from.guid}:${linkChain.node2.from.entityName}`;
        return `(${node1})-[${link}]->(${node2})`;
    }

    private isEntityUsed(entity: EntityNeo4J): boolean {
        return !!this.entityUsed.find(e => e === entity.guid);
    }
}