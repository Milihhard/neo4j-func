import PropertyDefinition from "../models/propertyDefinition";
import EntityNeo4J from "../models/entityNeo4j";
import { AnyDefinition } from "../models/any";
export function isEntity(o: any): o is EntityNeo4J {
    return (o as EntityNeo4J).isEntity !== undefined;
}

export function isPropertyDefinition(o: any): o is PropertyDefinition<any> {
    return (o as PropertyDefinition<any>).isPropertyDefinition !== undefined;
}

export function isAny(o: any): o is AnyDefinition {
    return (o as AnyDefinition).isAny !== undefined;
}