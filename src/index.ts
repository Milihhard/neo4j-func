

import {EntityTypeEnum} from './enum/entityTypeEnum'
import { ReturnTypeEnum } from './enum/returnTypeEnum'
import { define, node, link, property } from './decorators';
import Neo4jCommandFactory from './commands/commandNeo4jFactory';
import Neo4jCommand from './commands/commandsNeo4j';
import Neo4jCondition from './commands/conditionNeo4j';

const commands = {
    Neo4jCommandFactory,
    Neo4jCommand,
    Neo4jCondition,
}

const decorators = {
    define,
    node,
    link,
    property,
};

const enumarations = {
    EntityTypeEnum,
    ReturnTypeEnum
}

export {
    commands,
    decorators,
    enumarations,
    
}