/// <reference path="../pb_data/types.d.ts" />
onRecordAfterCreateSuccess((e) => {
  const title = e.record.get("title");
  const excerpt = e.record.get("excerpt") || e.record.get("content").substring(0, 200);
  const author = e.record.get("author") || "Staff";
  const category = e.record.get("category") || "general";
  
  const message = new MailerMessage({
    from: {
      address: $app.settings().meta.senderAddress,
      name: $app.settings().meta.senderName
    },
    to: [{ address: "admin@site.com" }],
    subject: "New Article Published: " + title,
    html: "<h2>New Article Published</h2>" +
          "<p><strong>Title:</strong> " + title + "</p>" +
          "<p><strong>Author:</strong> " + author + "</p>" +
          "<p><strong>Category:</strong> " + category + "</p>" +
          "<p><strong>Excerpt:</strong></p>" +
          "<p>" + excerpt + "</p>" +
          "<p><a href='https://yoursite.com/news/" + e.record.id + "'>View Full Article</a></p>"
  });
  
  try {
    $app.newMailClient().send(message);
  } catch (err) {
    console.log("Email send error: " + err.message);
  }
  
  e.next();
}, "news");