/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");

  const record0 = new Record(collection);
    record0.set("title", "Test Knowledge Article");
    record0.set("content", "This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length. This is a test article with unlimited content length.");
    record0.set("category", "knowledge");
    record0.set("publishDate", "2026-03-04");
    record0.set("excerpt", "Test excerpt");
    record0.set("author", "System Test");
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }
}, (app) => {
  // Rollback: record IDs not known, manual cleanup needed
})
