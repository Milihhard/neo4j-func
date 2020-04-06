import EntityNeo4J from './entityNeo4j';
import {EntityTypeEnum} from '../enum/entityTypeEnum';
import {define} from '../decorators';

export default function anyEntity(): AnyDefinition {
    return new AnyDefinition();
}

@define('Any', EntityTypeEnum.NODE)
export class AnyDefinition extends EntityNeo4J {
    isAny(): boolean {
        return true;
    }
}
