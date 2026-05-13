/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");
  const field = collection.fields.getByName("content");
  field.max = 1000000;
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  const field = collection.fields.getByName("content");
  field.max = 500000;
  return app.save(collection);
})
