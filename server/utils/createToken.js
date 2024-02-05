import jwt from "jsonwebtoken"

const generateToken = (res, userId) => {
      // const secretKey = "asbhdjahbsdjhbas"
      const token = jwt.sign({ userId }, "asbhdjahbsdjhbas", { expiresIn: "30d", })

      res.cookie("jwt", token, {
            secure: false,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      return token
}

export default generateToken

