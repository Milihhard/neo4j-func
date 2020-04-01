import Neo4jCommand from './commandsNeo4j';
import GuidNeo4J from './neo4jGuid';
import PropertyDefinition from './propertyDefinition';



export default class Neo4jCondition {
    private command: Neo4jCommand;
    private identifier: PropertyDefinition<string>;
    private word: string;

    constructor(word: string, command: Neo4jCommand, identifier: PropertyDefinition<string>) {
        this.word = word;
        this.command = command;
        this.identifier = identifier;
    }

    equals(value: string | number): Neo4jCommand {
        const g = GuidNeo4J.create();
        this.command.addCommand(`${this.getStartCondition()} = $${g}`);
        this.command.setArg(g.toString(), value);
        return this.command;
    }

    equalsAny(value: string): Neo4jCommand {
        const g = GuidNeo4J.create();
        this.command.addCommand(`${this.getStartCondition()} =~ $${g}`);
        this.command.setArg(g.toString(), `.*${value}.*`);
        return this.command;
    }

    private getStartCondition(): string {
        return `${this.word} ${this.identifier.getProperty()}`;
    }

}