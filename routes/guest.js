import express from "express";
export const guestRouter = express.Router();

guestRouter.use(express.static('./public'));

guestRouter.get("/", (req, res) => {
  res.render("guest/home", { layout: "glayout" });
});

guestRouter.get("/bicycles", (req, res) => {
  res.render("guest/bicycles", { layout: "glayout" });
});

guestRouter.get("/settings", (req, res) => {
  res.render("guest/settings",{layout:"glayout"});
});

guestRouter.get("/signin", (req, res) => {
  res.render("guest/signin",{layout:"glayout"});
});

guestRouter.get("/signup", (req, res) => {
  res.render("guest/signup",{layout:"glayout"});
});


