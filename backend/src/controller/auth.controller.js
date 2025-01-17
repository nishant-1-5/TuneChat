import {User} from "../models/user.model.js";

//if user has already signed up login else signup

export const authCallback = async (req, res, next) => {
    try{
        const {id, firstName, lastName, imageUrl, email} = req.body;
        const user = await User.findOne({clerkId: id});
        if(!user){
            //signup
            await User.create({
                clerkId: id,
                fullName: `${firstName || ''} ${lastName || ''}`.trim(),
                imageUrl,
                email
            })
        }
        res.status(200).json({success: true});
    }
    catch(err){
        console.log("Error in callback", err);
        next(err);
    }
};