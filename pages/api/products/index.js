import data from "../../../products"

const getProducts = async (req, res) => {
    const { method } = req;

    if (method === 'GET') {
        try {
          res.status(200).json( data );
        } catch (err) {
          console.error(err);
          res.status(400).json({ success: false, data: 'Failed to retrieve data.' });
        }
    }
 }

 export default getProducts;