const admin = require("../firebaseAdmin")

const firebaseAuth = async(req ,res ,next) => {

    try{
       const token = req.headers.authorization?.split("Bearer ")[1];

       if(!token) return res.status(401).json({mess : "no token provided"})
       const decodedToken = await admin.auth().verifyIdToken(token);

       req.user = decodedToken;
       next();
    }catch(err){
      res.status(401).json({mess : "somthing wrong in authentication", err})
    }
}

module.exports = firebaseAuth;

