# neo4j-func

[![Coverage Status](https://coveralls.io/repos/github/Milihhard/neo4j-func/badge.svg?branch=develop)](https://coveralls.io/github/Milihhard/neo4j-func?branch=develop) ![Testing app](https://github.com/Milihhard/neo4j-func/workflows/Testing%20app/badge.svg) ![Building](https://github.com/Milihhard/neo4j-func/workflows/Building/badge.svg) ![Publish to npm](https://github.com/Milihhard/neo4j-func/workflows/Publish%20to%20npm/badge.svg)

neo4j-func is a neo4j wrapper for node.js  
It helps making queries by using a functional approach

## Installation

```bash
$npm install neo4j-func
```

or

```bash
$yarn add neo4j-func
```

## Usage

### define the config file

```yaml
# neo4j.yaml
host: 0.0.0.0
port: 7687
credentials:
    user: neo4j
    password: neo4j
```

### define your nodes and links

For a node :

```typescript
@node('MyNode')
class MyNode extends NodeNeo4J {
    @property()
    @notNull
    mandatoryProperty: PropertyDefinition<string>;
    @property()
    property2: PropertyDefinition<string>;

    constructor(mandatoryProperty?: string, property2?: string) {
        super();
    }
}
```

For a link :

```typescript
@node('MyLink')
class MyLink extends LinkNeo4J {
    @property()
    @notNull
    mandatoryProperty: PropertyDefinition<string>;
    @property()
    property2: PropertyDefinition<string>;

    constructor(mandatoryProperty?: string, property2?: string) {
        super();
    }
}
```

### run you command

```typescript
const myNode = new MyNode('mandatory', 'optionnal');
new Neo4jCommand()
    .match(myNode)
    .where(ID(myNode))
    .equals(myNode.value(myNode.property2))
    .returnValue(node)
    .run()
    .then((result) =>
        result.records[0].map((record) => {
            if (result.records.length > 0) {
                return result.records[0].MyNode as MyNode;
            } else {
                return null;
            }
        })
    );
```

`.run` return a promise
