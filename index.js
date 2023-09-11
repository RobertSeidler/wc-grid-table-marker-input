let { MarkInput, fetchSelectCheckedValues, fetchCreateTableIfNotExists } = require("./MarkInput.js");

const MarkerInputPlugin = {
    name: "MarkerInputPlugin",
    exec: async function(data) {
        // console.log(this);
        return await this.setupMarkInputs(data);
    },
    type: "data",
    tableExtensions: {

        /**
         * Sets up the marker column, but only when all of the required attributes exist.
         * @param {object} data - table data
         * @returns {object} - table data
         */
        async setupMarkInputs(data) {
            const requiredAttributes = {
                identifierField: this.getAttribute('marker-identifierfield'),
                databaseTable: this.getAttribute('marker-databasetable'),
            };

            const optionalAttributes = {
                database: this.getAttribute('marker-database') ? this.getAttribute('marker-database') : "MarkerDB",
                databaseuser: this.getAttribute('marker-databaseuser') ? this.getAttribute('marker-databaseuser') : "wiki",
                markerText: this.getAttribute('marker-markertext'),
            };

            if (Reflect.ownKeys(requiredAttributes).map((key) => requiredAttributes[key]).every((value) => (value == undefined ? false : true))) {
                // console.log(data);
                await fetchCreateTableIfNotExists(optionalAttributes.database, optionalAttributes.databaseuser, requiredAttributes.databaseTable);
                let result = this.generateMarkInputData(data, requiredAttributes, optionalAttributes);
                // console.log(result);
                return result;
            } else {
                return data;
            }
        },

        /**
         * Creates a MarkInput element.
         * @param {string} identifierField
         * @param {string} identifierValue
         * @param {string} tablename
         * @param {string} database
         * @param {string} dbuser
         * @param {string} marker
         * @param {boolean} checked
         * @returns {string} - MarkInput outer html
         */
        createMarkInput(identifierField, identifierValue, tablename, database, dbuser, marker, checked) {
            let markInput = document.createElement('mark-input');
            markInput.setAttribute('identifierfield', identifierField);
            markInput.setAttribute('identifiervalue', identifierValue);
            if (tablename) markInput.setAttribute('databasetable', tablename);
            if (database) markInput.setAttribute('database', database);
            if (dbuser) markInput.setAttribute('databaseuser', dbuser);
            if (marker) markInput.setAttribute('markertext', marker);
            if (checked) markInput.toggleAttribute('checked', checked);
            return markInput.outerHTML;
        },

        /**
         * Generates the data for the table, which includes a row with MarkerInputs.
         * @param {object} data - table data
         * @param {{identifierField: string, databaseTable: string}} reqAttr - required MarkInput attributes
         * @param {{database?: string, databaseuser?: string, markerText?: string}} optAttr - optional MarkInput attributes
         * @returns {object} - table data
         */
        async generateMarkInputData(data, reqAttr, optAttr) {
            let { identifierField, databaseTable } = reqAttr;
            let { database, databaseuser, markerText } = optAttr;

            // databaseTable = databaseTable ? databaseTable : "DefaultTable";
            // markerText = markerText ? markerText : "jjj|nnn";

            return fetchSelectCheckedValues(database, databaseuser, databaseTable, identifierField)
                .then((checkedData) => {
                    return data.map((entry) => {
                        let checked = checkedData.map((value) => value.identifierValue).includes(encodeURIComponent(entry[identifierField].toString()));

                        return {
                            'marker': this.createMarkInput(identifierField, encodeURIComponent(entry[identifierField]).toString(), databaseTable, database, databaseuser, markerText, checked),
                            '#markiert': checked ? 'ja' : 'nein',
                            ...entry,
                        };
                    });
                });
        }
    }
}

customElements.define('mark-input', MarkInput);

module.exports = { MarkerInputPlugin }