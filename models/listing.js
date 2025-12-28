const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema= new Schema( {
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    image:{
        filename: {
            type:String,
            default: "listingimage" 
        }, 
        url: {
            type:String,
            default:"https://images.unsplash.com/photo-1532798369041-b33eb576ef16?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: v => (v) === ""
            ? "https://images.unsplash.com/photo-1532798369041-b33eb576ef16?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : v,
        }  
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
        required: true
    },
    country:{
        type:String,
    },
    geometry: {
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
    }
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    category: {
    type: String,
    enum: [ "trending", "rooms", "iconic", "mountains", "castles", "pools", "camping", "farms", "arctic", "deserts"],
    required: true
    },
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
    }
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports=Listing;