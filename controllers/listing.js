const geocodeLocation = require("../utils/geocode");
const Listing = require("../models/listing.js");


module.exports.index = async (req,res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", {allListings, activeCategory: null});
}



module.exports.renderNewForm = async (req,res) => {
    res.render("listings/new.ejs");
}



module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing= await Listing.findById(id)
            .populate({
                path:"reviews",
                populate: {
                    path:"author",
                }
            })
            .populate("owner");
    if(!listing){
        req.flash("error", "Listing you required for does not exist");
        return res.redirect("/listings");
    }
    res.render("./listings/show.ejs",{ listing });
}



module.exports.createListing = async (req,res) => {
        const newListing = new Listing(req.body.listing);
        console.log("FORM DATA:", req.body.listing);
        const geometry = await geocodeLocation(req.body.listing.location);
        if (!geometry) {
          req.flash("error", "Could not find that location, using default coordinates");
          newListing.geometry = {
            type: "Point",
            coordinates: [77.2090, 28.6139]
        };
        } else {
            newListing.geometry = geometry;
        }

         if(req.file){
            newListing.image = {
                url: req.file.path,
                filename: req.file.filename
            }
        }

        newListing.owner = req.user._id;

        await newListing.save();
        console.log("User typed location:", req.body.listing.location);
        req.flash("success", "New listing Created");
        // console.log(newListing); 
        res.redirect(`/listings`);
}



module.exports.renderEditForm = async (req,res) =>{
        let {id} = req.params;
        const listing =await  Listing.findById(id);
        console.log("CATEGORY:", listing.category);
        if(!listing){
            req.flash("error", "Listing you required for does not exist");
            return res.redirect("/listings");
        }
        let originalImageUrl = listing.image.url;
        originalImageUrl = originalImageUrl.replace("/upload","/upload/h_300,w_300")
        res.render("listings/edit.ejs", {listing, originalImageUrl} );
}



module.exports.updateListing = async (req,res) => {
        let {id}= req.params;
        let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
        if(typeof req.file !== "undefined"){
            listing.image = {
                url:req.file.path,
                filename: req.file.filename
            }
            await listing.save();
        }
        req.flash("success","Listing Updated");
        res.redirect(`/listings/${id}`);
}


module.exports.destroyListing = async (req,res) =>{
        let {id} = req.params;
        const deleteListing = await Listing.findByIdAndDelete(id);
        req.flash("success","Listing Deleted");
        // console.log(deleteListing);
        res.redirect("/listings");
}

module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;

  const allListings = await Listing.find({ category });

  res.render("listings/index.ejs", { allListings , activeCategory: category});
};

