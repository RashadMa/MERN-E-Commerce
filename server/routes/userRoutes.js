import express from "express"
import { createUser, login, logout, getAllUsers, getCurrentUserProfile, updateCurrentUserProfile, deleteUserById, getUserById, updateUserById } from "../controllers/userController.js"
import { auth, authAdmin } from "../middlewares/authMiddleware.js"
const router = express.Router()

router.route('/').post(createUser).get(auth, authAdmin, getAllUsers)
router.post('/auth', login)
router.post('/logout', logout)
router.route("/profile").get(auth, getCurrentUserProfile).put(auth, updateCurrentUserProfile)
router.route("/:id").delete(auth, authAdmin, deleteUserById).get(auth, authAdmin, getUserById).put(auth, authAdmin, updateUserById)

export default router