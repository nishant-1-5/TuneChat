import { clerkClient } from "@clerk/express";


// Use to check if user is authenticated to perform tasks like liking adding to playlist etc..
export const protectRoute = async (req, res, next) => {
  const sessionId = await req.auth?.userId;
  console.log(sessionId);
  if (!sessionId) {
    return res.status(401).json({ message: "Unauthorized, Not logged in. Protect Route" });
  }
  next();
}

//Midlleware to check if the user is Admin and will use where only Admins are allowed, adding songs etc...
export const requireAdmin = async (req, res, next) => {
    try{
        const user = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = (user.primaryEmailAddress.emailAddress === process.env.ADMIN_EMAIL_1 )|| (user.primaryEmailAddress.emailAddress === process.env.ADMIN_EMAIL_2) ;
        if(!isAdmin){
            return res.status(403).json({message: "Forbidden, Only Admins allowed"});
        }
        next();
    }
    catch(err){
        console.log("Error in requireAdmin", err);
        next(err)
      }
}