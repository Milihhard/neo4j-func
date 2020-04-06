import { expect } from 'chai';
import anyEntity from '../src/models/any'

describe('Any', () => {
    const anyEnt = anyEntity();
    it('should be any', () => {
      expect(anyEnt.isAny()).to.be.true;
    });
    it('should be name Any', () => {
      expect(anyEnt.entityName).to.equal('Any');
    });
});
