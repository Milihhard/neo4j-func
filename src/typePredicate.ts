import EntityNeo4J from "./entityNeo4j";
import PropertyDefinition from "./propertyDefinition";
import { AnyDefinition } from "./any";

export function isEntity(o: any): o is EntityNeo4J {
    return (o as EntityNeo4J).isEntity !== undefined;
}

export function isPropertyDefinition(o: any): o is PropertyDefinition<any> {
    return (o as PropertyDefinition<any>).isPropertyDefinition !== undefined;
}

export function isAny(o: any): o is AnyDefinition {
    return (o as AnyDefinition).isAny !== undefined;
}