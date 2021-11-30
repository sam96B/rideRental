import express from "express";
export const userRouter = express.Router();

userRouter.use(express.static('./public'));

userRouter.get("/", (req, res) => {
  res.render("user/home");
});

userRouter.get("/bicycles", (req, res) => {
  res.render("user/bicycles");
});

userRouter.get("/settings", (req, res) => {
  res.render("user/settings");
});
