import express from "express";
import controllers from "../controllers";
import validators from "../validators";
const router = express.Router();

router.get("/all", controllers.Card.getAllCards);
router.get("/:cardId", controllers.Card.getCardById);

export default router;
