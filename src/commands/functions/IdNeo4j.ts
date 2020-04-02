import EntityNeo4J from "../../models/entityNeo4j";
import PropertyDefinition from "../../models/propertyDefinition";
import IdPropertyDefinition from "../../models/IdProperty";

export default function ID(entity: EntityNeo4J): PropertyDefinition<string> {
    return new IdPropertyDefinition(entity, 'id');
}