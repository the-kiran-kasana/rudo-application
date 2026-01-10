const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
const userAuthRoutes = require("./routes/protectedRoutes")
const groupRoutes = require("./routes/groupRoutes")

require("dotenv").config();
const app = express();




//app.use(cors({
//    origin : "http://localhost:5173", "https://rudo-application-v4tf.vercel.app/"
//    method : ["GET", "POST", "PUT", "DELETE"],
//    credentials: true
//}))


//
//app.use(
//  cors({
//    origin: process.env.NODE_ENV === "production"
//      ? "*" // allow frontend domain later
//      : "http://localhost:5173",
//    credentials: true,
//  })
//);


const allowedOrigins = [
  "http://localhost:5173",
  "https://rudo-application-azej.vercel.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);




app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.use("/api" , userAuthRoutes)
app.use("/group" , groupRoutes);
app.use("/api/expenses", require("./routes/expense.routes"));



mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("✅ MongoDB Connected"))
        .catch((err) => console.error(err));



app.listen(process.env.PORT , () => {
     console.log("server is running on 8000");
})