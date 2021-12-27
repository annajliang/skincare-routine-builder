import dbConnect from "../../../server/utils/dbConnect";
import Product from "../../../models/Product";

dbConnect();

const getProducts = async (req, res) => {
    const { method } = req;
    console.log(method)

    if (method === 'GET') {
        try {
            const products = await Product.find();
            res.status(200).json({ success: true, data: products })
        } catch (err) {
            res.status(400).json({ success: false });
        }
    }
 }

 export default getProducts;