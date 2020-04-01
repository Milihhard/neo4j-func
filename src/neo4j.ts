
import * as neo4jModule from 'neo4j-driver';
import { Driver, QueryResult } from 'neo4j-driver/types/';

const neo4j = neo4jModule;


export default class Neo4jService {
    driver: Driver;
    private static instance: Neo4jService;

    constructor() {
        this.driver = neo4j.driver('bolt://0.0.0.0:7687', neo4j.auth.basic('neo4j', 'neo4j'));
    }

    runCommand(command: string, attribute: any): Promise<QueryResult> {
        const session = this.driver.session();
        // const resultPromise = session.run(
        //     'CREATE (a:Person {name: $name}) RETURN a',
        //     { name: personName }
        // );
        const resultPromise = session.run(command, attribute)

        return resultPromise.then((result: any) => {
            return result;
        }).finally(() => {
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