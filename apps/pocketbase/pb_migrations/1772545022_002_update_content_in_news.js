/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");
  const field = collection.fields.getByName("content");
  field.max = 50000;
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  const field = collection.fields.getByName("content");
  field.max = 5000;
  return app.save(collection);
})
