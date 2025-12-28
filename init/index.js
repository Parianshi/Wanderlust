const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj, 
    owner : '694849cf5452284216ffec37',
    geometry: {
      type:"Point",
      coordinates:[
        obj.longitude || 77.2090, // lng
        obj.latitude || 28.6139   // lat
      ]
    }
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB(); 

