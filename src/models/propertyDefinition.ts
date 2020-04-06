import EntityNeo4J from './entityNeo4j';

export default class PropertyDefinition<T> {
    from: EntityNeo4J;
    property: T;

    constructor(from: EntityNeo4J, property: T) {
        this.from = from;
        this.property = property;
    }

    getProperty(): string {
        return `${this.from.guid}.${this.property}`;
    }

    isPropertyDefinition(): boolean {
        return true;
    }
}
