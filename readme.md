# Introduction
This is a plugin for (wc-grid-table)[https://www.npmjs.com/package/wc-grid-table]. It adds new column to the beginning of the table with a checkbox, which can be checked or unchecked. The state of those is saved in a database. It also includes a hidden column (#marker), which can be used to sort by marking.

# Installation
Run `npm i wc-grid-table-marker-input` to install this package. 

# Usage
Import the `MarkerInputPlugin` from `wc-grid-table-marker-input` and register the plugin by calling `TableComponent.prototype.registerPlugin` like in the following example. Also both attributes, that are used in the example are required, but don't have to be set via `HTMLElement.prototype.setAttribute`.

``` javascript
let table = document.createElement('wc-grid-table');

table.setAttribute('marker-identifierfield', 'Unternehmen');
table.setAttribute('marker-databasetable', 'Example2Test');

table.registerPlugin(MarkerInputPlugin)
```

# Configuration options
All options are expected to be HTML-Attributes on the `<wc-grid-table>` element.
| attribute              | description                                                                                                                                                                                    | Default        |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------|
| marker-identifierfield | the column, that is used to generate a database key for every item. They should be same for items, that are supposed to share the checkmark.                                                   | undefined      |
| marker-databasetable   | the table in the currently selected database, that is used to store the data for a specific table. Reuse database tables, when you want to have different table apps share the same checkmarks | "DefaultTable" |
| marker-database        | the name of the selected database.                                                                                                                                                             | "MarkerDB"     |
| marker-databaseuser    | the name of the database user, you want to use. Default is "wiki"                                                                                                                              | "wiki"         |
| marker-markertext      | the text added to the hidden "#marker" column. Has to be two strings seperated by a "\|".                                                                                                      | "true\|false"  |