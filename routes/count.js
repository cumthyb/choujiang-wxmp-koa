const { Counter } = require("../db");
const homePage = fs.readFileSync(
  path.join(__dirname, "..", "index.html"),
  "utf-8"
);

const loadRouter_count = (router) => {
  router.get("/", async (ctx) => {
    ctx.body = homePage;
  });

  // 更新计数
  router.post("/api/count", async (ctx) => {
    const { request } = ctx;
    const { action } = request.body;
    if (action === "inc") {
      await Counter.create();
    } else if (action === "clear") {
      await Counter.destroy({
        truncate: true,
      });
    }

    ctx.body = {
      code: 0,
      data: await Counter.count(),
    };
  });

  // 获取计数
  router.get("/api/count", async (ctx) => {
    const result = await Counter.count();

    ctx.body = {
      code: 0,
      data: result,
    };
  });

  // 小程序调用，获取微信 Open ID
  router.get("/api/wx_openid", async (ctx) => {
    if (ctx.request.headers["x-wx-source"]) {
      ctx.body = ctx.request.headers["x-wx-openid"];
    }
  });
};

module.exports = {
  loadRouter_count,
};
