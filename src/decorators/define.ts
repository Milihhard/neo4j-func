import { EntityTypeEnum } from "../enum/entityTypeEnum";
import EntityFactory from "../entityFactory";

export function define(attr: string, type: EntityTypeEnum): (...args: any[]) => any {

  return function _DecoratorName(constr: any): any {
    const updatedObject = class extends constr {
      constructor(...args: any[]) {
        super(...args);
        (this as any)._entityName = attr;
        let index = 0
        for (const b in this) {
          if (b[0] !== '_') {
            (this as any)._properties.set(b, args[index]);
            index++;
          }
        }
      }
    }
    if (type === EntityTypeEnum.NODE) {
      EntityFactory.addNode(attr, updatedObject);
    } else {
      EntityFactory.addLink(attr, updatedObject);
    }

    return updatedObject;
  }
}

