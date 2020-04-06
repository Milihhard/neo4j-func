import {Guid} from 'guid-typescript';

export default abstract class GuidNeo4J {
    static create(): string {
        return 'a' + Guid.create().toString().split('-').join('_');
    }
}
