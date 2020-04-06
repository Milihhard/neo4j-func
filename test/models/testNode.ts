import {node, NodeNeo4J, property, notNull, PropertyDefinition} from '../../src';

@node('TestNode')
export default class TestNode extends NodeNeo4J {
    @property()
    @notNull
    test: PropertyDefinition<string>;
    constructor(test?: string) {
        super();
    }
}
