import EntityNeo4J from "./entityNeo4j";

export default class EntityFactory {
    private static nodes: Map<string, any> = new Map();
    private static links: Map<string, any> = new Map();


    static createInstance(entityName: string, id: string, args?: any): EntityNeo4J {
        const argsToCreate = [];
        if (args) {
            for (const arg of Object.keys(args)) {
                argsToCreate.push(args[arg]);
            }
        }
        const className = this.nodes.get(entityName) ?? this.links.get(entityName)
        const obj = new className(...argsToCreate);
        obj._id = id;
        return obj;
    }

    static addNode(from: string, to: any): void {
        this.nodes.set(from, to);
    }

    static addLink(from: string, to: any): void {
        this.links.set(from, to);
    }
}