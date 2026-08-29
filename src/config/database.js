const mongoose = require("mongoose")

const connectDB = async()=>{
    await mongoose.connect(
        "mongodb+srv://nitinpurohit412_db_user:ueHLnVZhqidmGSQy@namastenode.pfchm6l.mongodb.net/"
    );
};

module.exports = connectDB;
