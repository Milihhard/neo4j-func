import { ResultSummary, Integer } from "neo4j-driver";
import ReturnLabel from "./returnLabel";

export default interface ReturnResult {
    records: ReturnLabel[],
    summary: ResultSummary<Integer>
}