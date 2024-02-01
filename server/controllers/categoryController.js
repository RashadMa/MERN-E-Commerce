import Category from "../models/categoryModel.js"
import asyncHandler from "../middlewares/asyncHandler.js"

const createCategory = asyncHandler(async (req, res) => {
      try {
            const { name } = req.body
            if (!name.trim()) {
                  return res.json({ error: "Name is required" })
            }

            const existingCategory = await Category.findOne({ name })
            if (existingCategory) {
                  return res.json({ error: "Category already added" })
            }

            const category = await new Category({ name }).save()
            res.json(category)

      } catch (error) {
            console.log(error)
            return res.status(400).json(error)
      }
})

const readCategories = asyncHandler(async (req, res) => {
      try {
            const getAll = await Category.find({})
            res.json(getAll)
      } catch (error) {
            console.error(error)
            return res.status(400).json(error.message)
      }
})

const readCategoryById = asyncHandler(async (req, res) => {
      try {
            const category = await Category.findOne({ _id: req.params.id })
            res.json(category)
      } catch (error) {
            console.error(error)
            return res.status(400).json(error.message)
      }
})

const updateCategory = asyncHandler(async (req, res) => {
      try {
            const { name } = req.body
            const { categoryId } = req.params
            const category = await Category.findOne({ _id: categoryId })

            if (!category) {
                  return res.status(404).json({ error: "Category not found" })
            }

            category.name = name
            const updatedCategory = await category.save()
            res.json(updatedCategory)
      } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
      }
})

const deleteCategory = asyncHandler(async (req, res) => {
      try {
            const deletedCategory = await Category.findByIdAndDelete(req.params.categoryId)
            res.json(deletedCategory)
      } catch (error) {
            console.error(error)
            res.status(500).json({ error: "Internal server error" })
      }
})

export { createCategory, updateCategory, deleteCategory, readCategories, readCategoryById }