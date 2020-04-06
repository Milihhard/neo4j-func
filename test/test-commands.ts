import {expect} from 'chai';
import Neo4jCommand from '../src/commands/commandsNeo4j';
import anyEntity from '../src/models/any';
import {node, property} from '../src/decorators';
import PropertyDefinition from '../src/models/propertyDefinition';
import NodeNeo4J from '../src/models/nodeNeo4j';

@node('TestNode')
class TestNode extends NodeNeo4J {
    @property()
    test: PropertyDefinition<string>;
    constructor(test?: string) {
        super();
    }
}

describe('Neo4Commands', () => {
    it('Should run simple command', (done) => {
        const anyEnt = anyEntity();
        new Neo4jCommand()
            .match(anyEnt)
            .returnValue(anyEnt)
            .run()
            .finally(() => {
                done();
            });
    });
    describe('Command', () => {
        it('Should create a node', (done) => {
            const test = new TestNode('test');
            new Neo4jCommand()
                .create(test)
                .run()
                .then(() => done())
                .catch((err) => done(err));
        });
        it('Should get the created node', (done) => {
            const test = new TestNode();
            new Neo4jCommand()
                .match(test)
                .returnValue(test)
                .run()
                .then((result) => {
                    expect(result.records.length).to.be.equal(1);
                    done();
                })
                .catch((err) => {
                    done(err);
                });
        });
    });
});
