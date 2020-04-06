import NodeNeo4J from '../models/nodeNeo4j';
import {LinkResult} from '../models/linking';

export default interface ReturnLabel {
    [key: string]: string | boolean | number | NodeNeo4J | LinkResult;
}
