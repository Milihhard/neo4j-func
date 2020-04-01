import NodeNeo4J from "../nodeNeo4j";
import PropertyDefinition from "../propertyDefinition";

export default function property(): any {
    return (target: NodeNeo4J, propertyName: string) => {
        Object.defineProperty(target, propertyName, {
            get(): PropertyDefinition<string> {
                return this.get(propertyName);
            },
            enumerable: true,
            configurable: true,
        });
    }
}