import PropertyDefinition from './propertyDefinition';
import GuidNeo4J from '../utils/neo4jGuid';

export default abstract class EntityNeo4J {
    public _id: string;
    private _entityName: string;
    private _guid: string;
    protected _properties: Map<string, any>;

    constructor() {
        this._guid = GuidNeo4J.create();
        this._properties = new Map();
    }

    get entityName(): string {
        return this._entityName;
    }

    get guid(): string {
        return this._guid;
    }

    get properties(): Map<string, any> {
        return this._properties;
    }

    get(value: string): PropertyDefinition<string> {
        return new PropertyDefinition(this, value);
    }

    isEntity(): boolean {
        return true;
    }

    value(p: PropertyDefinition<string>): any {
        return this.properties.get(p.property);
    }

    getProperties(): any {
        const props: any = {
            id: this._id,
        };
        this.properties.forEach((value: any, key: string) => {
            props[key] = value;
        });
        return props;
    }

    toString(): string {
        const propsToAdd: string[] = [];
        this.properties.forEach((value, key) => {
            propsToAdd.push(`${key}: ${value}`);
        });
        return `{${propsToAdd.join(', ')}}`;
    }

    toJSON(): any {
        return this.getProperties();
    }
}
