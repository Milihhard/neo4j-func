import PropertyDefinition from './propertyDefinition';
import NodeNeo4J from './nodeNeo4j';
import {LinkChain} from './linking';

export class LinkingTo {
    private node: PropertyDefinition<boolean>;
    private link: PropertyDefinition<boolean>;

    constructor(node: PropertyDefinition<boolean>, link: PropertyDefinition<boolean>) {
        this.node = node;
        this.link = link;
    }

    to(n: NodeNeo4J, save: boolean = false): LinkChain {
        return {
            node1: this.node,
            link: this.link,
            node2: new PropertyDefinition<boolean>(n, save),
        };
    }
}
