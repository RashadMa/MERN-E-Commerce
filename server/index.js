import path from "path";
import express from "express"
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import userRoute from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import cors from "cors"

dotenv.config()
const port = 4000
connectDB()
const app = express()

app.use(cors({
      origin: 'https://mern-e-commerce-api-2.vercel.app',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
}));

app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type');
      next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use("/api/users", userRoute)
app.use('/api/category', categoryRoutes)
app.use('/api/products', productRoutes)
app.use("/api/upload", uploadRoutes)
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal", (req, res) => {
      res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
})

const __dirname = path.resolve();
app.use("/client/uploads", express.static(path.join(__dirname + "/client/uploads")));

app.listen(port, () => console.log("Server running"))