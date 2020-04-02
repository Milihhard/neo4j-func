import NodeNeo4J from "./nodeNeo4j";
import LinkNeo4J from "./linkNeo4j";
import PropertyDefinition from "./propertyDefinition";
import EntityNeo4J from "./entityNeo4j";
import { LinkingTo } from "./linkingTo";

export class Linking {
    private node: PropertyDefinition<boolean>;

    constructor(node: NodeNeo4J, save: boolean = false) {
        this.node = new PropertyDefinition(node, save);
    }

    link(l: LinkNeo4J): LinkingTo {
        return new LinkingTo(this.node, new PropertyDefinition(l, true));
    }
}

export interface LinkChain {
    node1: PropertyDefinition<boolean>;
    link: PropertyDefinition<boolean>
    node2: PropertyDefinition<boolean>;
}


export interface LinkResult {
    node: LinkResultEntity;
    link: LinkResultEntity
    to: LinkResultEntity;
}

export interface LinkResultEntity {
    name: string;
    id: number
    value: EntityNeo4J;
}