# Introduction
This is a plugin for (wc-grid-table)[https://www.npmjs.com/package/wc-grid-table]. It adds new column to the beginning of the table with a checkbox, which can be checked or unchecked. The state of those is saved in a database. It also includes a hidden column (#marker), which can be used to sort by marking.

# Installation
Run `npm i wc-grid-table-marker-input` to install this package. 

# Usage
Import the `MarkerInputPlugin` from `wc-grid-table-marker-input` and register the plugin by calling `TableComponent.prototype.registerPlugin` like in the following example. Also both attributes, that are used in the example are required, but don't have to be set via `HTMLElement.prototype.setAttribute`. It can also be set by specifing them in the HTML element. 
``` javascript
let table = document.createElement('wc-grid-table');

table.setAttribute('marker-identifierfield', 'Unternehmen');
table.setAttribute('marker-databasetable', 'Example2Test');

table.registerPlugin(MarkerInputPlugin)

```

Equivilant HTML example:
``` HTML
<script type="module" src="https://unpkg.com/wc-grid-table-marker-input@1.0.3/index.js"></script>
<script>
  import { MarkerInputPlugin } from wc-grid-table-marker-input;
</script>
<wc-grid-table marker-identifierfield="Unternehmen" marker-databasetable="Example2Test"></wc-grid-table>


```