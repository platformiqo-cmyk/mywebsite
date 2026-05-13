/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");

  const existing = collection.fields.getByName("category");
  if (existing) {
    if (existing.type === "select") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("category"); // exists with wrong type, remove first
  }

  collection.fields.add(new SelectField({
    name: "category",
    required: false,
    values: ["market-analysis", "knowledge"]
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  collection.fields.removeByName("category");
  return app.save(collection);
})
