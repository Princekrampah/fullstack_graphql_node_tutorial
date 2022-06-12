const mongoose  = require("mongoose");


const DBConnection = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connection to DB established: ${conn.connection.host}`.underline.blue);
}


module.exports = DBConnection;
