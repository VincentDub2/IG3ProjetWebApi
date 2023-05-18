import express from 'express';
import passport from '../config/passport';
import { login, register,ExternalLogin } from '../controllers/authentifications';


export default (router : express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.post("/auth/socialLog", ExternalLogin);
    
    router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
    router.get("/auth/google/callback", passport.authenticate("google", { successRedirect: "/", failureRedirect: "/login" }));
  
    router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));
    router.get("/auth/github/callback", passport.authenticate("github", { successRedirect: "/", failureRedirect: "/login" }));
  
};


