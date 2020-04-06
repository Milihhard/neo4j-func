import {expect} from 'chai';
import {Linking, Neo4jCommand, anyEntity} from '../src';
import TestNode from './models/testNode';
import TestLink from './models/testLink';
import clearDatabase from './clearDatabase';
describe('Neo4Commands', () => {
    beforeEach((done) => {
        clearDatabase(done);
    });
    it('Should run simple command', (done) => {
        const anyEnt = anyEntity();
        new Neo4jCommand()
            .match(anyEnt)
            .returnValue(anyEnt)
            .run()
            .then(() => done())
            .catch((err) => done(err));
    });
    describe('Commands', () => {
        describe('Nodes', () => {
            it('Should fail due to mandatory property', (done) => {
                const test = new TestNode();
                new Neo4jCommand()
                    .create(test)
                    .run()
                    .then(() => done(new Error('mandatory property')))
                    .catch(() => done());
            });
            it('Should create a node', (done) => {
                const test = new TestNode('test');
                new Neo4jCommand()
                    .create(test)
                    .run()
                    .then(() => done())
                    .catch((err) => done(err));
            });
            it('Should get the created node', (done) => {
                const test = new TestNode('test');
                new Neo4jCommand()
                    .create(test)
                    .run()
                    .then(() => new Neo4jCommand().match(test).returnValue(test).run())
                    .then((result) => {
                        expect(result.records).to.have.length(1);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
            it('Should get the created node (with where)', (done) => {
                const test = new TestNode('test');
                new Neo4jCommand()
                    .create(test)
                    .run()
                    .then(() =>
                        new Neo4jCommand()
                            .match(test)
                            .where(test.test)
                            .equals('test')
                            .returnValue(test)
                            .run()
                    )
                    .then((result) => {
                        expect(result.records).to.have.length(1);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
            it('Should get the created node (with where any)', (done) => {
                const test = new TestNode('test');
                new Neo4jCommand()
                    .create(test)
                    .run()
                    .then(() =>
                        new Neo4jCommand()
                            .match(test)
                            .where(test.test)
                            .equalsAny('est')
                            .returnValue(test)
                            .run()
                    )
                    .then((result) => {
                        expect(result.records).to.have.length(1);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });
        describe('Links', () => {
            it('Should fail due to mandatory property', (done) => {
                const test = new TestNode();
                const link = new TestLink('test');
                new Neo4jCommand()
                    .match(test)
                    .create(
                        new Linking(test, true)
                            .link(new TestLink())
                            .to(new TestNode(), true)
                    )
                    .run()
                    .then(() => done(new Error('mandatory property')))
                    .catch((err) => done());
            });
            it('Should create a link', (done) => {
                const test = new TestNode('test');
                const link = new TestLink('test');
                new Neo4jCommand()
                    .match(test)
                    .create(new Linking(test).link(link).to(new TestNode('test2'), true))
                    .run()
                    .then(() => done())
                    .catch((err) => done(err));
            });
            it('Should get the created link', (done) => {
                const testNode = new TestNode('test');
                const testNodeTo = new TestNode();
                const link = new TestLink('test');
                new Neo4jCommand()
                    .create(
                        new Linking(testNode, true)
                            .link(link)
                            .to(new TestNode('test2'), true)
                    )
                    .run()
                    .then(() =>
                        new Neo4jCommand()
                            .match(
                                new Linking(testNode).link(new TestLink()).to(testNodeTo)
                            )
                            .returnValue(testNodeTo)
                            .run()
                    )
                    .then((result) => {
                        expect(result.records).to.have.length(1);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
            it('Should get the created node with optional match', (done) => {
                const test = new TestNode('test');
                new Neo4jCommand()
                    .create(test)
                    .run()
                    .then(() =>
                        new Neo4jCommand()
                            .match(test)
                            .optionalMatch(
                                new Linking(test).link(new TestLink()).to(anyEntity())
                            )
                            .returnValue(test)
                            .run()
                    )
                    .then((result) => {
                        expect(result.records).to.have.length(1);
                        done();
                    })
                    .catch((err) => {
                        done(err);
                    });
            });
        });
    });
});
