import Neo4jConfig from './config';
const configDefault: Neo4jConfig = {
    host: '0.0.0.0',
    port: 7687,
    credentials: {
        user: 'neo4j',
        password: 'neo4j',
    },
};

export default configDefault;
