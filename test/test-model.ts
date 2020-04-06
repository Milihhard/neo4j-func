import {expect} from 'chai';
import {
    Linking,
    Neo4jCommand,
    anyEntity,
    NodeNeo4J,
    Neo4jCommandFactory,
    node,
} from '../src';
import TestNode from './models/testNode';
import TestLink from './models/testLink';
import clearDatabase from './clearDatabase';
describe('Models', () => {
    const testNode = new TestNode('test1');
    it('Should be an entity', () => {
        expect(testNode.isEntity()).to.be.true;
    });

    it('Should be have right properties', () => {
        expect(testNode.toJSON().test).to.be.equals('test1');
    });

    it('Should be right toString', () => {
        expect(testNode.toString()).to.be.equals('{test: test1}');
    });
});
