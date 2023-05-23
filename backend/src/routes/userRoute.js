const express=require("express");
const { createUser, loginUser } = require("../controllers/userController");
const { authentication, authorization } = require("../middlewares/auth");
const  router=express.Router();

router.route("/register").post(createUser)

router.route("/login").post(loginUser)


module.exports=router;