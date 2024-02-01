import express from "express";
import { auth, authAdmin } from "../middlewares/authMiddleware.js";
import { createCategory, updateCategory, deleteCategory, readCategories, readCategoryById } from "../controllers/categoryController.js";


const router = express.Router()


router.route("/").post(auth, authAdmin, createCategory)
router.route("/:categoryId").put(auth, authAdmin, updateCategory)
router.route("/:categoryId").delete(auth, authAdmin, deleteCategory)
router.route("/categories").get(readCategories)
router.route("/:id").get(readCategoryById)

export default router