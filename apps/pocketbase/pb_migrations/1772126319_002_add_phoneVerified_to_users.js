/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("users");
  
  collection.fields.add(new BoolField({
    name: "phoneVerified",
    required: false
  }));
  
  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("users");
  collection.fields.removeByName("phoneVerified");
  return app.save(collection);
})
