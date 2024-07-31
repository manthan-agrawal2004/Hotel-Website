const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listings.js")
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});
router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.create));

router.get("/new",isLoggedIn,listingController.createForm); 
router
.route("/:id")
.get(wrapAsync(listingController.showListings))
.put(upload.single("listing[image]"),validateListing,isLoggedIn,isOwner,wrapAsync(listingController.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));

 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editForm));
 
 module.exports=router;