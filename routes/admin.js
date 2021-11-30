import express from "express";
export const adminRouter = express.Router();

adminRouter.use(express.static('./public'));

adminRouter.get("/", (req, res) => {
  res.render("admin/home", { layout: "alayout" });
});

adminRouter.get("/bicycles", (req, res) => {
  res.render("admin/bicycles", { layout: "alayout" });
});

adminRouter.get("/settings", (req, res) => {
  res.render("admin/settings", { layout: "alayout" });
});
