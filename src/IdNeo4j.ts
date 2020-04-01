import PropertyDefinition from "./propertyDefinition";
import EntityNeo4J from "./entityNeo4j";
import IdPropertyDefinition from "./IdProperty";

export default function ID(entity: EntityNeo4J): PropertyDefinition<string> {
    return new IdPropertyDefinition(entity, 'id');
}