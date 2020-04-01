import { define } from "./decorators/define";
import { EntityTypeEnum } from "./enum/entityTypeEnum";
import EntityNeo4J from "./entityNeo4j";


export default function anyEntity(): AnyDefinition { return new AnyDefinition() };

@define('Any', EntityTypeEnum.NODE)
export class AnyDefinition extends EntityNeo4J {

    isAny(): boolean {
        return true;
    }
}
