import PropertyDefinition from "./propertyDefinition";
import EntityNeo4J from "./entityNeo4j";

export default class IdPropertyDefinition<T> extends PropertyDefinition<T> {

    constructor(from: EntityNeo4J, property: T) {
        super(from, property);
    }

    getProperty(): string {
        return `ID(${this.from.guid})`;
    }
}