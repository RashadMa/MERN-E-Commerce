import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

const auth = asyncHandler(async (req, res, next) => {
      let token
      token = req.cookies.jwt
      if (token) {
            try {
                  const decoded = jwt.verify(token, "asbhdjahbsdjhbas")
                  req.user = await User.findById(decoded.userId).select("-password")
                  next()
            } catch (error) {
                  res.status(401)
                  throw new Error("Not authorized, token failed")
            }
      } else {
            res.status(401)
            return req
      }
})

const authAdmin = (req, res, next) => {
      if (req.user && req.user.isAdmin) {
            next()
      } else {
            res.status(401).send("Not authorized as an Admin")
      }
}

export { auth, authAdmin }