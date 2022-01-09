import dbConnect from "../../../server/utils/dbConnect";
import Product from "../../../models/Product";

dbConnect();

const getProducts = async (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        try {
            const products = await Product.find().limit(100);
            res.status(200).json({ success: true, data: products })
        } catch (err) {
            console.error(err)
            res.status(400).json({ success: false });
        }
    }
 }

 export default getProducts;