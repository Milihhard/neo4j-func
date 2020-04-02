

import {EntityTypeEnum} from './enum/entityTypeEnum'
import { ReturnTypeEnum } from './enum/returnTypeEnum'
import { define, node, link, property, notNull } from './decorators';
import Neo4jCommandFactory from './commands/commandNeo4jFactory';
import Neo4jCommand from './commands/commandsNeo4j';
import Neo4jCondition from './commands/conditionNeo4j';
import ID from './commands/functions/IdNeo4j';
import { AnyDefinition } from './models/any';
import EntityFactory from './models/entityFactory';
import EntityNeo4J from './models/entityNeo4j';
import IdPropertyDefinition from './models/IdProperty';
import LinkNeo4J from './models/linkNeo4j';
import { Linking } from './models/linking';
import NodeNeo4J from './models/nodeNeo4j';
import PropertyDefinition from './models/propertyDefinition';
import GuidNeo4J from './utils/neo4jGuid';
import { isEntity, isPropertyDefinition, isAny } from './utils/typePredicate';
import { Validator } from './utils/validator';
import Neo4jService from './neo4j';
import { LinkingTo } from './models/linkingTo';

const commands = {
    Neo4jCommandFactory,
    Neo4jCommand,
    Neo4jCondition,
    ID
}

const decorators = {
    define,
    node,
    link,
    property,
    notNull
};

const enumarations = {
    EntityTypeEnum,
    ReturnTypeEnum,
}
const models = {
    AnyDefinition,
    EntityFactory,
    EntityNeo4J,
    IdPropertyDefinition,
    LinkNeo4J,
    Linking,
    LinkingTo,
    NodeNeo4J,
    PropertyDefinition,
}

const utils = {
    GuidNeo4J,
    isEntity,
    isPropertyDefinition,
    isAny,
    Validator,
}

export {
    commands,
    decorators,
    enumarations,
    utils,
    Neo4jService,
}