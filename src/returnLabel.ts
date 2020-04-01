import NodeNeo4J from "./nodeNeo4j";
import { LinkResult } from "./linking";

export default interface ReturnLabel{
    [key: string]: string | boolean | number | NodeNeo4J | LinkResult
}