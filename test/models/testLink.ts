import {property, PropertyDefinition, LinkNeo4J, link} from '../../src';

@link('TestLink')
export default class TestLink extends LinkNeo4J {
    @property()
    test: PropertyDefinition<string>;
    constructor(test?: string) {
        super();
    }
}
