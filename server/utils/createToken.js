import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
      const token = jwt.sign({ userId }, process.env.JWT, { expiresIn: "30d", })

      res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      return token
}

export default generateToken

