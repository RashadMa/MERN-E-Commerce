import express from "express";
import { createOrder, readAllOrders, readUserOrders, countTotalOrders, calculateTotalSales, calculateTotalSalesByDate, findOrderById, markOrderAsPaid } from "../controllers/orderController.js";
import { auth, authAdmin } from "../middlewares/authMiddleware.js";
import { markOrderAsDelivered } from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(auth, createOrder).get(auth, authAdmin, readAllOrders)
router.route("/mine").get(auth, readUserOrders)
router.route("/total-orders").get(countTotalOrders)
router.route("/total-sales").get(calculateTotalSales)
router.route("/total-sales-by-date").get(calculateTotalSalesByDate)
router.route("/:id").get(auth, findOrderById)
router.route("/:id/pay").put(auth, markOrderAsPaid)
router.route("/:id/deliver").put(auth, authAdmin, markOrderAsDelivered)

export default router;