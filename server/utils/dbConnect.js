import mongoose from 'mongoose';
import { MONGO_URI } from "../constants/connectionString";

const connection = {};

const dbConnect = async () => {
    if (connection.isConnected) {
        return
    }

    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}

export default dbConnect;