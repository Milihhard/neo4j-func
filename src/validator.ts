import NodeNeo4J from "./nodeNeo4j";

export function notNull(target: any, propertyKey: string): void {
    Validator.registerNotNull(target.constructor.name, propertyKey);
}

export interface ValidatorResponse {
    valid: boolean;
    property?: string;
}
export class Validator {
    private static notNullValidatorMap: Map<any, string[]> = new Map();

    static registerNotNull(target: any, property: any): void {
        let keys: string[] = this.notNullValidatorMap.get(target);
        if (!keys) {
            keys = [];
            this.notNullValidatorMap.set(target, keys);
        }
        keys.push(property);
    }

    static validate(target: NodeNeo4J): ValidatorResponse {
        const notNullProps: string[] = this.notNullValidatorMap.get(target.entityName);
        if (!notNullProps) {
            return { valid: true };
        }
        let valid: boolean = true;
        const props: string[] = [];
        for (const property of notNullProps) {
            const value = target.properties.get(property);
            if (!value) {
                valid = false;
                props.push(property);
            }
        }
        return { valid, property: props.join(', ') };
    }
}