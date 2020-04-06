import {Neo4jService} from '../src';

export default function clearDatabase(done: any) {
    Neo4jService.getInstance()
        .runCommand(
            'MATCH(n) \
        OPTIONAL MATCH (n)-[l]->()\
        DELETE n, l',
            {}
        )
        .finally(() => {
            done();
        });
}
