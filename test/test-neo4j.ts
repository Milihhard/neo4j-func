import {expect} from 'chai';
import Neo4jService from '../src/neo4j';
import clearDatabase from './clearDatabase';

describe('Neo4jService', () => {
    const neo4j = Neo4jService.getInstance();
    describe('config', () => {
        it('Should be an instance of Neo4jService', () => {
            expect(neo4j instanceof Neo4jService).to.be.true;
        });
        it('Should have custom credential password', () => {
            expect(neo4j.config.credentials.password).equals('test');
        });
    });
    describe('commands', () => {
        beforeEach((done) => {
            clearDatabase(done);
        });
        it('Should run the command', (done) => {
            neo4j
                .runCommand('MATCH (n) RETURN n', {})
                .then(() => done())
                .catch((err) => done(err));
        });
    });
});
after(() => {
    Neo4jService.getInstance().closeNeo4j();
});
