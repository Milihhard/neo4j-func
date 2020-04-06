import {expect} from 'chai';
import {Neo4jCommandFactory} from '../src';
import TestNode from './models/testNode';
import clearDatabase from './clearDatabase';
describe('Neo4jCommandFactory', () => {
    beforeEach((done) => {
        clearDatabase(done);
    });
    it('Should run create', (done) => {
        Neo4jCommandFactory.create(new TestNode('test'))
            .then(() => done())
            .catch((err) => done(err));
    });
    it('Should run findAll', (done) => {
        Neo4jCommandFactory.create(new TestNode('test'))
            .then(() => Neo4jCommandFactory.findAll(new TestNode()))
            .then((nodes) => {
                expect(nodes).to.have.length(1);
                done();
            })
            .catch((err) => done(err));
    });
    it('Should run findByProp', (done) => {
        Neo4jCommandFactory.create(new TestNode('test1'))
            .then(() => Neo4jCommandFactory.findByProp(new TestNode(), 'test', 'test1'))
            .then((nodes) => {
                expect(nodes).to.have.length(1);
                done();
            })
            .catch((err) => done(err));
    });
    it('Should run findByAnyProp', (done) => {
        Neo4jCommandFactory.create(new TestNode('test1'))
            .then(() => Neo4jCommandFactory.findByAnyProp(new TestNode(), 'test', 'es'))
            .then((nodes) => {
                expect(nodes).to.have.length(1);
                done();
            })
            .catch((err) => done(err));
    });
    it('Should run findById', (done) => {
        Neo4jCommandFactory.create(new TestNode('test'))
            .then(() => Neo4jCommandFactory.findAll(new TestNode()))
            .then((nodes) =>
                Neo4jCommandFactory.findById(new TestNode(), parseInt(nodes[0]._id, 10))
            )
            .then((testNode) => {
                expect(testNode.value((testNode as TestNode).test)).to.be.equals('test');
                done();
            })
            .catch((err) => done(err));
    });
    it('Should run findById et return nothing', (done) => {
        Neo4jCommandFactory.findById(new TestNode(), 0)
            .then((testNode) => {
                expect(testNode).to.be.null;
                done();
            })
            .catch((err) => done(err));
    });
});
