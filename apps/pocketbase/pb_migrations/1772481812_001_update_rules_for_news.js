/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");
  collection.deleteRule = "@request.auth.role = \"admin\"";
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("news");
  collection.deleteRule = "@request.auth.id != \"\"";
  return app.save(collection);
})
