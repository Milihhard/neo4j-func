import {EntityTypeEnum} from '../enum/entityTypeEnum';
import EntityFactory from '../models/entityFactory';
import NodeNeo4J from '../models/nodeNeo4j';
import PropertyDefinition from '../models/propertyDefinition';
import {Validator} from '../utils/validator';

export function define(attr: string, type: EntityTypeEnum): (...args: any[]) => any {
    return function _DecoratorName(constr: any): any {
        const updatedObject = class extends constr {
            constructor(...args: any[]) {
                super(...args);
                (this as any)._entityName = attr;
                let index = 0;
                for (const b in this) {
                    if (b[0] !== '_') {
                        (this as any)._properties.set(b, args[index]);
                        index++;
                    }
                }
            }
        };
        if (type === EntityTypeEnum.NODE) {
            EntityFactory.addNode(attr, updatedObject);
        } else {
            EntityFactory.addLink(attr, updatedObject);
        }

        return updatedObject;
    };
}

export function link(attr: any): (...args: any[]) => any {
    return define(attr, EntityTypeEnum.LINK);
}
export function node(attr: any): (...args: any[]) => any {
    return define(attr, EntityTypeEnum.NODE);
}
export function property(): any {
    return (target: NodeNeo4J, propertyName: string) => {
        Object.defineProperty(target, propertyName, {
            get(): PropertyDefinition<string> {
                return this.get(propertyName);
            },
            enumerable: true,
            configurable: true,
        });
    };
}

export function notNull(target: any, propertyKey: string): void {
    Validator.registerNotNull(target.constructor.name, propertyKey);
}
