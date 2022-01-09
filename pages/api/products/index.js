import dbConnect from "../../../server/utils/dbConnect";
import Product from "../../../models/Product";
import mongoose from "mongoose";

dbConnect();

const getProducts = async (req, res) => {
    const { method } = req;
    const session = await mongoose.startSession();

    if (method === 'GET') {
        try {
          // get request fix - https://stackoverflow.com/questions/68607254/mongodb-node-js-driver-4-0-0-cursor-session-id-issues-in-production-on-vercel
          const products = await Product.find().session(session);
          res.status(200).json({ success: true, data: products });
        } catch (err) {
            console.error(err)
            res.status(400).json({ success: false });
        }
    }
 }

 export default getProducts;