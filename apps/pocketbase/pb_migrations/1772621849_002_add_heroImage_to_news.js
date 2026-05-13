/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");

  const existing = collection.fields.getByName("heroImage");
  if (existing) {
    if (existing.type === "file") {
      return; // field already exists with correct type, skip
    }
    collection.fields.removeByName("heroImage"); // exists with wrong type, remove first
  }

  collection.fields.add(new FileField({
    name: "heroImage",
    required: false,
    maxSelect: 1,
    maxSize: 20971520
  }));

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  collection.fields.removeByName("heroImage");
  return app.save(collection);
})
