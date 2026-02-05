const session = require("express-session");
const MongoStore = require("connect-mongo");

exports.sessionInitialization=
  session({
    name: "sid", 
    secret: process.env.random_secrete_key,
    resave: false,
    saveUninitialized: false,

    store:  MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/session_auth"
    }),

    cookie: {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 1000 * 60 * 20
    }
  });

exports.isAuthenticated=(req, res, next)=>{
  if (!req.session.userId) {
    return res.status(401).json({ message: "session not exists or expired" });
  }
  next();
}