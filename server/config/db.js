import mongoose from "mongoose";

const mongo = 'mongodb+srv://rashadkhm:011220007298rR@store-app.nbmlfkl.mongodb.net/store?retryWrites=true&w=majority'
const connectDB = async () => {
      try {
            await mongoose.connect(mongo)
            console.log("Connected to DB");
      } catch (error) {
            console.log(error);
            process.exit(1);
      }
}

export default connectDB