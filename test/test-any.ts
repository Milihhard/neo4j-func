import { expect } from 'chai';
import anyEntity from '../src/any'
// if you used the '@types/mocha' method to install mocha type definitions, uncomment the following line
// import 'mocha';

describe('Any', function() { 
    let any = anyEntity();
    it('should be any', function() {
      expect(any.isAny()).to.be.true;
    });
    it('should be name Any', function() {
      expect(any.entityName).to.equal('Any');
    });
});
