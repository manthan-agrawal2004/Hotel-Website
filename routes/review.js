const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const Review=require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")
const Listing=require("../models/listing.js");
const reviewController=require("../controllers/reviews.js");
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.newReview));
//Reviews Delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
module.exports=router;