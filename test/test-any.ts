import { expect } from 'chai';
import anyEntity from '../src/any'

describe('Any', function() { 
    let any = anyEntity();
    it('should be any', function() {
      expect(any.isAny()).to.be.true;
    });
    it('should be name Any', function() {
      expect(any.entityName).to.equal('Any');
    });
});
