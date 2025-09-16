import mongoose from "mongoose";

const connect_to_db = (uri) => mongoose.connect(uri, { connectTimeoutMS: 10000 })

export default connect_to_db;