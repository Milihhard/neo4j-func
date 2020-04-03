# neo4j-func #

neo4j-func is a neo4j wrapper for node.js   
It helps making queries by using a functional approach  


## Installation ##

``` bash
$npm install neo4j-func
```

or

``` bash
$yarn add neo4j-func
```

## Usage ##

### define your nodes and links

For a node :
``` typescript
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
``` typescript
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

### run you command ###
``` typescript
const myNode = new MyNode('mandatory', 'optionnal');
new Neo4jCommand()
    .match(myNode)
    .where(ID(myNode)).equals(myNode.value(myNode.property2))
    .returnValue(node)
    .run()
    .then(result => 
        result.records[0].map(record => {
            if (result.records.length > 0) {
                return result.records[0].MyNode as MyNode;
            } else {
                return null;
            }
        })
    );
```
`.run` return a promise