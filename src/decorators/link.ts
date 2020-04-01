import { define } from "./define";
import { EntityTypeEnum } from "../enum/entityTypeEnum";

// export function node(constructor: any): void {
export function link(attr: any): (...args: any[]) => any {
  return define(attr, EntityTypeEnum.LINK);
}

