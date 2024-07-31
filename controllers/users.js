const User=require("../models/user.js");

module.exports.signupForm=(req,res)=>{
    res.render("users/signup.ejs");
}
module.exports.loginForm=(req,res)=>{
    res.render("users/login.ejs");
}
module.exports.signup=async(req,res,next)=>{
    try{
   let {username,email,password}=req.body;
   const newUser=new User({email,username});
   const registeredUser=await User.register(newUser,password);
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","Welcome back to Wanderlust!");
    res.redirect("/listings");
   })
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}
module.exports.login=async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl=res.locals.redirectUrl;
    if(!redirectUrl){
        res.redirect("/listings");
    }
    else{
        res.redirect(res.locals.redirectUrl);
    }
}
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You are logged out!");
        res.redirect("/login");
    })
}
