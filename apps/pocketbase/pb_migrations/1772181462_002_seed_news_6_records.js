/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("news");

  const record0 = new Record(collection);
    record0.set("title", "Tin \u0111\u1ea7u ng\u00e0y: Ph\u1ed1 Wall ch\u1ecbu \u00e1p l\u1ef1c b\u1edfi s\u1ef1 ph\u1ee5c h\u1ed3i c\u1ee7a \u0111\u1ed3ng USD v\u00e0 \u0111\u00e0 gi\u1ea3m c\u1ee7a ng\u00e0nh b\u00e1n d\u1eabn");
    record0.set("excerpt", "Ch\u1ec9 s\u1ed1 S&P 500 gi\u1ea3m 1.2% do lo ng\u1ea1i l\u1ea1m ph\u00e1t v\u00e0 t\u0103ng l\u00e3i su\u1ea5t");
    record0.set("content", "Ph\u1ed1 Wall ch\u1ecbu \u00e1p l\u1ef1c m\u1ea1nh trong phi\u00ean giao d\u1ecbch h\u00f4m nay khi c\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 lo ng\u1ea1i v\u1ec1 s\u1ef1 ph\u1ee5c h\u1ed3i c\u1ee7a \u0111\u1ed3ng USD v\u00e0 t\u00e1c \u0111\u1ed9ng ti\u00eau c\u1ef1c \u0111\u1ebfn c\u00e1c c\u00f4ng ty c\u00f4ng ngh\u1ec7. Ch\u1ec9 s\u1ed1 S&P 500 gi\u1ea3m 1.2%, trong khi Nasdaq gi\u1ea3m 1.8% do b\u00e1n th\u00e1o c\u00e1c c\u1ed5 phi\u1ebfu c\u00f4ng ngh\u1ec7. \u0110\u1ed3ng USD t\u0103ng gi\u00e1 m\u1ea1nh so v\u1edbi c\u00e1c \u0111\u1ed3ng ti\u1ec1n ch\u00ednh kh\u00e1c, ph\u1ea3n \u00e1nh k\u1ef3 v\u1ecdng v\u1ec1 l\u00e3i su\u1ea5t cao h\u01a1n t\u1eeb C\u1ee5c D\u1ef1 tr\u1eef Li\u00ean bang. C\u00e1c nh\u00e0 ph\u00e2n t\u00edch cho r\u1eb1ng th\u1ecb tr\u01b0\u1eddng s\u1ebd ti\u1ebfp t\u1ee5c bi\u1ebfn \u0111\u1ed9ng cho \u0111\u1ebfn khi c\u00f3 th\u00eam th\u00f4ng tin v\u1ec1 ch\u00ednh s\u00e1ch ti\u1ec1n t\u1ec7.");
    record0.set("author", "Nguy\u1ec5n V\u0103n A");
    record0.set("publishDate", "2026-02-27");
    record0.set("featured", true);
  try {
    app.save(record0);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record1 = new Record(collection);
    record1.set("title", "Ph\u00e2n t\u00edch k\u1ef9 thu\u1eadt: C\u1eb7p EUR/USD c\u00f3 th\u1ec3 ti\u1ebfp t\u1ee5c t\u0103ng n\u1ebfu v\u01b0\u1ee3t qua m\u1ee9c 1.0950");
    record1.set("excerpt", "C\u00e1c nh\u00e0 giao d\u1ecbch forex theo d\u00f5i m\u1ee9c kh\u00e1ng c\u1ef1 ch\u00ednh t\u1ea1i 1.0950");
    record1.set("content", "C\u1eb7p EUR/USD \u0111ang \u1edf v\u1ecb tr\u00ed quan tr\u1ecdng tr\u00ean bi\u1ec3u \u0111\u1ed3 k\u1ef9 thu\u1eadt. N\u1ebfu \u0111\u1ed3ng Euro v\u01b0\u1ee3t qua m\u1ee9c kh\u00e1ng c\u1ef1 1.0950, c\u00f3 th\u1ec3 s\u1ebd ti\u1ebfp t\u1ee5c t\u0103ng l\u00ean m\u1ee5c ti\u00eau 1.1050. Ng\u01b0\u1ee3c l\u1ea1i, n\u1ebfu kh\u00f4ng v\u01b0\u1ee3t qua \u0111\u01b0\u1ee3c, c\u1eb7p ti\u1ec1n t\u1ec7 c\u00f3 th\u1ec3 quay tr\u1edf l\u1ea1i m\u1ee9c h\u1ed7 tr\u1ee3 1.0850. Kh\u1ed1i l\u01b0\u1ee3ng giao d\u1ecbch t\u0103ng \u0111\u00e1ng k\u1ec3, cho th\u1ea5y s\u1ef1 quan t\u00e2m c\u1ee7a c\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 l\u1edbn. C\u00e1c ch\u1ec9 b\u00e1o k\u1ef9 thu\u1eadt nh\u01b0 RSI v\u00e0 MACD \u0111\u1ec1u cho t\u00edn hi\u1ec7u t\u00edch c\u1ef1c. C\u00e1c nh\u00e0 giao d\u1ecbch n\u00ean ch\u00fa \u00fd \u0111\u1ebfn c\u00e1c m\u1ee9c n\u00e0y \u0111\u1ec3 \u0111\u01b0a ra quy\u1ebft \u0111\u1ecbnh giao d\u1ecbch h\u1ee3p l\u00fd.");
    record1.set("author", "Tr\u1ea7n Th\u1ecb B");
    record1.set("publishDate", "2026-02-26");
    record1.set("featured", true);
  try {
    app.save(record1);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record2 = new Record(collection);
    record2.set("title", "D\u1ef1 b\u00e1o th\u1ecb tr\u01b0\u1eddng: Gi\u00e1 d\u1ea7u Brent c\u00f3 th\u1ec3 ch\u1ea1m m\u1ee9c $90 trong tu\u1ea7n t\u1edbi");
    record2.set("excerpt", "C\u00e1c y\u1ebfu t\u1ed1 \u0111\u1ecba ch\u00ednh tr\u1ecb v\u00e0 c\u1eaft gi\u1ea3m s\u1ea3n l\u01b0\u1ee3ng h\u1ed7 tr\u1ee3 gi\u00e1 d\u1ea7u");
    record2.set("content", "Gi\u00e1 d\u1ea7u Brent \u0111ang t\u0103ng m\u1ea1nh do lo ng\u1ea1i v\u1ec1 cung c\u1ea5p t\u1eeb c\u00e1c khu v\u1ef1c s\u1ea3n xu\u1ea5t ch\u00ednh. C\u00e1c y\u1ebfu t\u1ed1 \u0111\u1ecba ch\u00ednh tr\u1ecb \u1edf Trung \u0110\u00f4ng v\u00e0 c\u1eaft gi\u1ea3m s\u1ea3n l\u01b0\u1ee3ng t\u1eeb OPEC+ \u0111ang h\u1ed7 tr\u1ee3 gi\u00e1. N\u1ebfu gi\u00e1 v\u01b0\u1ee3t qua m\u1ee9c $88, c\u00f3 th\u1ec3 s\u1ebd ti\u1ebfp t\u1ee5c t\u0103ng l\u00ean $90 trong tu\u1ea7n t\u1edbi. Tuy nhi\u00ean, lo ng\u1ea1i v\u1ec1 nhu c\u1ea7u to\u00e0n c\u1ea7u c\u00f3 th\u1ec3 h\u1ea1n ch\u1ebf m\u1ee9c t\u0103ng. C\u00e1c nh\u00e0 ph\u00e2n t\u00edch d\u1ef1 b\u00e1o gi\u00e1 d\u1ea7u s\u1ebd dao \u0111\u1ed9ng trong kho\u1ea3ng $85-$92 trong nh\u1eefng tu\u1ea7n t\u1edbi. C\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 n\u00ean theo d\u00f5i c\u00e1c b\u00e1o c\u00e1o v\u1ec1 t\u1ed3n kho d\u1ea7u v\u00e0 ho\u1ea1t \u0111\u1ed9ng \u0111\u1ecba ch\u00ednh tr\u1ecb.");
    record2.set("author", "L\u00ea V\u0103n C");
    record2.set("publishDate", "2026-02-25");
    record2.set("featured", true);
  try {
    app.save(record2);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record3 = new Record(collection);
    record3.set("title", "C\u1ed5 phi\u1ebfu c\u00f4ng ngh\u1ec7: Apple v\u00e0 Microsoft d\u1eabn \u0111\u1ea7u trong phi\u00ean giao d\u1ecbch h\u00f4m nay");
    record3.set("excerpt", "C\u00e1c c\u00f4ng ty c\u00f4ng ngh\u1ec7 l\u1edbn t\u0103ng gi\u00e1 sau b\u00e1o c\u00e1o l\u1ee3i nhu\u1eadn t\u1ed1t");
    record3.set("content", "Apple v\u00e0 Microsoft d\u1eabn \u0111\u1ea7u trong phi\u00ean giao d\u1ecbch h\u00f4m nay v\u1edbi m\u1ee9c t\u0103ng l\u1ea7n l\u01b0\u1ee3t l\u00e0 2.5% v\u00e0 2.1%. C\u00e1c c\u00f4ng ty n\u00e0y \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3 b\u1edfi b\u00e1o c\u00e1o l\u1ee3i nhu\u1eadn v\u01b0\u1ee3t k\u1ef3 v\u1ecdng v\u00e0 tri\u1ec3n v\u1ecdng t\u00edch c\u1ef1c cho c\u00e1c s\u1ea3n ph\u1ea9m m\u1edbi. Nvidia c\u0169ng t\u0103ng 1.8% do nhu c\u1ea7u cao v\u1ec1 chip AI. Tuy nhi\u00ean, m\u1ed9t s\u1ed1 c\u00f4ng ty c\u00f4ng ngh\u1ec7 kh\u00e1c gi\u1ea3m gi\u00e1 do lo ng\u1ea1i v\u1ec1 chi ph\u00ed ho\u1ea1t \u0111\u1ed9ng. Nh\u00ecn chung, ng\u00e0nh c\u00f4ng ngh\u1ec7 v\u1eabn l\u00e0 l\u1ef1a ch\u1ecdn \u01b0a th\u00edch c\u1ee7a c\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 d\u00e0i h\u1ea1n. C\u00e1c nh\u00e0 ph\u00e2n t\u00edch khuy\u1ebfn ngh\u1ecb n\u00ean t\u1eadp trung v\u00e0o c\u00e1c c\u00f4ng ty c\u00f3 n\u1ec1n t\u1ea3ng t\u00e0i ch\u00ednh v\u1eefng ch\u1eafc.");
    record3.set("author", "Ph\u1ea1m Th\u1ecb D");
    record3.set("publishDate", "2026-02-24");
    record3.set("featured", true);
  try {
    app.save(record3);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record4 = new Record(collection);
    record4.set("title", "Ph\u00e2n t\u00edch h\u00e0ng ho\u00e1: Gi\u00e1 v\u00e0ng t\u0103ng do lo ng\u1ea1i l\u1ea1m ph\u00e1t to\u00e0n c\u1ea7u");
    record4.set("excerpt", "V\u00e0ng \u0111\u01b0\u1ee3c coi l\u00e0 t\u00e0i s\u1ea3n tr\u00fa \u1ea9n an to\u00e0n gi\u1eefa b\u1ea5t \u1ed5n kinh t\u1ebf");
    record4.set("content", "Gi\u00e1 v\u00e0ng t\u0103ng l\u00ean m\u1ee9c cao nh\u1ea5t trong 3 th\u00e1ng do lo ng\u1ea1i v\u1ec1 l\u1ea1m ph\u00e1t to\u00e0n c\u1ea7u v\u00e0 b\u1ea5t \u1ed5n \u0111\u1ecba ch\u00ednh tr\u1ecb. V\u00e0ng \u0111\u01b0\u1ee3c coi l\u00e0 t\u00e0i s\u1ea3n tr\u00fa \u1ea9n an to\u00e0n khi c\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 t\u00ecm c\u00e1ch b\u1ea3o v\u1ec7 t\u00e0i s\u1ea3n c\u1ee7a h\u1ecd. Gi\u00e1 v\u00e0ng hi\u1ec7n \u1edf m\u1ee9c $2,050 m\u1ed7i ounce, g\u1ea7n m\u1ee5c ti\u00eau $2,100. Nhu c\u1ea7u t\u1eeb c\u00e1c ng\u00e2n h\u00e0ng trung \u01b0\u01a1ng t\u0103ng \u0111\u00e1ng k\u1ec3 khi h\u1ecd t\u00ecm c\u00e1ch \u0111a d\u1ea1ng h\u00f3a d\u1ef1 tr\u1eef ngo\u1ea1i h\u1ed1i. Tuy nhi\u00ean, l\u00e3i su\u1ea5t cao h\u01a1n c\u00f3 th\u1ec3 h\u1ea1n ch\u1ebf m\u1ee9c t\u0103ng c\u1ee7a v\u00e0ng v\u00ec n\u00f3 kh\u00f4ng sinh l\u1ee3i. C\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 n\u00ean c\u00e2n nh\u1eafc t\u1ef7 tr\u1ecdng v\u00e0ng trong danh m\u1ee5c \u0111\u1ea7u t\u01b0 c\u1ee7a h\u1ecd.");
    record4.set("author", "Ho\u00e0ng V\u0103n E");
    record4.set("publishDate", "2026-02-23");
    record4.set("featured", true);
  try {
    app.save(record4);
  } catch (e) {
    if (e.message.includes("Value must be unique")) {
      console.log("Record with unique value already exists, skipping");
    } else {
      throw e;
    }
  }

  const record5 = new Record(collection);
    record5.set("title", "Xu h\u01b0\u1edbng th\u1ecb tr\u01b0\u1eddng: C\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 chuy\u1ec3n h\u01b0\u1edbng sang c\u00e1c c\u1ed5 phi\u1ebfu ph\u00f2ng v\u1ec7");
    record5.set("excerpt", "C\u1ed5 phi\u1ebfu ti\u00eau d\u00f9ng thi\u1ebft y\u1ebfu v\u00e0 c\u00f4ng nghi\u1ec7p \u0111\u01b0\u1ee3c \u01b0a chu\u1ed9ng h\u01a1n");
    record5.set("content", "Trong b\u1ed1i c\u1ea3nh b\u1ea5t \u1ed5n kinh t\u1ebf, c\u00e1c nh\u00e0 \u0111\u1ea7u t\u01b0 \u0111ang chuy\u1ec3n h\u01b0\u1edbng t\u1eeb c\u00e1c c\u1ed5 phi\u1ebfu t\u0103ng tr\u01b0\u1edfng sang c\u00e1c c\u1ed5 phi\u1ebfu ph\u00f2ng v\u1ec7. C\u00e1c c\u1ed5 phi\u1ebfu ti\u00eau d\u00f9ng thi\u1ebft y\u1ebfu, c\u00f4ng nghi\u1ec7p v\u00e0 n\u0103ng l\u01b0\u1ee3ng \u0111ang \u0111\u01b0\u1ee3c \u01b0a chu\u1ed9ng h\u01a1n. Chi\u1ebfn l\u01b0\u1ee3c n\u00e0y ph\u1ea3n \u00e1nh lo ng\u1ea1i v\u1ec1 suy tho\u00e1i kinh t\u1ebf v\u00e0 nhu c\u1ea7u gi\u1ea3m. C\u00e1c c\u00f4ng ty c\u00f3 l\u1ee3i nhu\u1eadn \u1ed5n \u0111\u1ecbnh v\u00e0 c\u1ed5 t\u1ee9c cao \u0111ang thu h\u00fat v\u1ed1n. C\u00e1c qu\u1ef9 \u0111\u1ea7u t\u01b0 \u0111ang t\u0103ng t\u1ef7 tr\u1ecdng v\u00e0o c\u00e1c c\u1ed5 phi\u1ebfu ph\u00f2ng v\u1ec7 \u0111\u1ec3 gi\u1ea3m r\u1ee7i ro. C\u00e1c nh\u00e0 ph\u00e2n t\u00edch d\u1ef1 b\u00e1o xu h\u01b0\u1edbng n\u00e0y s\u1ebd ti\u1ebfp t\u1ee5c cho \u0111\u1ebfn khi c\u00f3 t\u00edn hi\u1ec7u t\u00edch c\u1ef1c t\u1eeb kinh t\u1ebf to\u00e0n c\u1ea7u.");
    record5.set("author", "V\u00f5 Th\u1ecb F");
    record5.set("publishDate", "2026-02-22");
    record5.set("featured", true);
  try {
    app.save(record5);
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
