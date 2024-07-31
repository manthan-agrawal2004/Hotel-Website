const Listing=require("../models/listing.js")
const Review=require("../models/review.js");
module.exports.newReview=async(req,res)=>{
    let {id}=req.params;
    let listing= await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Added")
    console.log("New Review Created!");
    res.redirect(`/listings/${id}`)
}
module.exports.deleteReview=async(req,res)=>{
    let{id,reviewId}=req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})
    req.flash("success","Review Deleted!!");
    res.redirect(`/listings/${id}`);
}