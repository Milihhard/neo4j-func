import { expect } from 'chai';
import Neo4jService from '../src/neo4j';
describe('Neo4jService', function () {
  let neo4j = Neo4jService.getInstance();
  describe('config', function () {
    it('Should be an instance of Neo4jService', function () {
      expect(neo4j instanceof Neo4jService).to.be.true;
    });
    it('Should have custom credential password', function () {
      expect(neo4j.config.credentials.password).equals('test');
    });
  });
  describe('commands', () => {
    it('Should run the command', function() {
      neo4j.runCommand('MATCH (n) RETURN n', {});
    });
  });
});