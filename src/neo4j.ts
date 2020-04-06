import * as neo4jModule from 'neo4j-driver';
import {Driver, QueryResult} from 'neo4j-driver/types/';
import yaml from 'js-yaml';
import fs from 'fs';
import Neo4jConfig from './config/config';
import _ from 'lodash';
import configDefault from './config/neo4j-default';

const neo4j = neo4jModule;

export default class Neo4jService {
    driver: Driver;
    private static instance: Neo4jService;
    config: Neo4jConfig;

    constructor() {
        // Get document, or throw exception on error
        let configCustom: Neo4jConfig;
        try {
            configCustom = yaml.safeLoad(
                fs.readFileSync(process.cwd() + '/neo4j.yaml', 'utf8')
            );
        } catch (e) {
            configCustom = {};
        }
        this.config = _.merge(configDefault, configCustom);
        this.driver = neo4j.driver(
            `bolt://${this.config.host}:${this.config.port}`,
            neo4j.auth.basic(
                this.config.credentials.user,
                this.config.credentials.password
            )
        );
    }

    runCommand(command: string, attribute: any): Promise<QueryResult> {
        const session = this.driver.session();
        // const resultPromise = session.run(
        //     'CREATE (a:Person {name: $name}) RETURN a',
        //     { name: personName }
        // );
        const resultPromise = session.run(command, attribute);

        return resultPromise
            .then((result: any) => {
                return result;
            })
            .finally(() => {
                session.close();
            });
    }

    closeNeo4j(): void {
        this.driver.close();
    }

    public static getInstance(): Neo4jService {
        if (!Neo4jService.instance) {
            Neo4jService.instance = new Neo4jService();
        }

        return Neo4jService.instance;
    }
}
