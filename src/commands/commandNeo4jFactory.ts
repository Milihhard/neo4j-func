import Neo4jCommand from './commandsNeo4j';
import NodeNeo4J from '../models/nodeNeo4j';
import PropertyDefinition from '../models/propertyDefinition';
import ReturnResult from './returnResult';
import Neo4jCondition from './conditionNeo4j';
import ID from './functions/idNeo4j';

export default class Neo4jCommandFactory {
    static findAll<T extends NodeNeo4J>(nodeDefinition: T): Promise<NodeNeo4J[]> {
        return new Neo4jCommand()
            .match(nodeDefinition)
            .returnValue(nodeDefinition)
            .run()
            .then((result) =>
                result.records.map(
                    (record) => record[nodeDefinition.entityName] as NodeNeo4J
                )
            );
    }

    static findById<T extends NodeNeo4J>(node: T, value: number): Promise<NodeNeo4J> {
        return new Neo4jCommand()
            .match(node)
            .where(ID(node))
            .equals(value)
            .returnValue(node)
            .run()
            .then((result) => {
                if (result.records.length > 0) {
                    return result.records[0][node.entityName] as NodeNeo4J;
                } else {
                    return null;
                }
            });
    }

    static findByProp<T extends NodeNeo4J>(
        node: T,
        prop: keyof T,
        value: string
    ): Promise<NodeNeo4J[]> {
        return this.findProp(node, prop, value, 'equals');
    }

    static findByAnyProp<T extends NodeNeo4J>(
        node: T,
        prop: keyof T,
        value: string
    ): Promise<NodeNeo4J[]> {
        return this.findProp(node, prop, value, 'equalsAny');
    }

    static create<T extends NodeNeo4J>(node: T): Promise<ReturnResult> {
        return new Neo4jCommand().create(node).run();
    }

    private static findProp<T extends NodeNeo4J>(
        node: T,
        prop: keyof T,
        value: string,
        equalFunction: keyof Neo4jCondition
    ): Promise<NodeNeo4J[]> {
        return new Neo4jCommand()
            .match(node)
            .where((node[prop] as unknown) as PropertyDefinition<string>)
            [equalFunction](value)
            .returnValue(node)
            .run()
            .then((result) =>
                result.records.map((record) => record[node.entityName] as NodeNeo4J)
            );
    }
}
