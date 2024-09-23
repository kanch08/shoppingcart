const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.DB_URI);
    console.log(`connected with `, connection.host, connection.port);
    console.log("connection", connection.db.collection("users"))
    connection.db.collection("users").aggregate([
      { $lookup:
         {
           from: 'carts',
           localField: '_id',
           foreignField: 'id',
           as: 'orderdetails'
         }
       }
      ]).toArray(function(err, res) {
        console.log("res>>", res)
      if (err) throw err;
      console.log(JSON.stringify(res));
     
      })
      } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
