export default interface Neo4jConfig {
    host?: string;
    port?: number;
    credentials?: {
        user?: string;
        password?: string;
    };
}
