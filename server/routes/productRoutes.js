import express from "express";
import formidable from "express-formidable"
import { auth, authAdmin } from "../middlewares/authMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { createProduct, updateProduct, deleteProduct, readProducts, readProductById, readAllProducts, createProductReview, readTopProducts, readNewProducts, filterProducts } from "../controllers/productController.js";

const router = express.Router()

router.route("/allproducts").get(readAllProducts)
router.route("/:id/reviews").post(auth, authAdmin, checkId, createProductReview)
router.route("/").get(readProducts).post(auth, authAdmin, formidable(), createProduct)
router.get("/top", readTopProducts)
router.get("/new", readNewProducts)
router.route("/:id").get(readProductById).put(auth, authAdmin, formidable(), updateProduct).delete(auth, authAdmin, deleteProduct)
router.route("/filtered-products").post(filterProducts)

export default router