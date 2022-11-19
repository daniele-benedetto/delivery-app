const Airtable = require("airtable");

Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID);

const table = base(process.env.AIRTABLE_TABLE_NAME);

const getMinifiedItem = (record) => {
    if (!record.fields.brought) {
        record.fields.brought = false;
    }
    return {
        id: record.id,
        fields: record.fields,
    };
};

export { table, getMinifiedItem };