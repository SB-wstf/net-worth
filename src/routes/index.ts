import express from "express";
const router = express.Router();
import chat from "./chat";
import card from "./card";

const defaultRoutes = [
  {
    path: "/chat",
    route: chat,
  },
  {
    path: "/card",
    route: card,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.get("/", async (req, res) => {
  return res.send("Server is running");
});

export default router;
