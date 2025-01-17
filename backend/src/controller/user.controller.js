import { User } from '../models/user.model.js';

export const getAllUsers = async (req, res, next) => {
     try {
        const currentUser = req.auth.userId; //clerk middleware adds auth obj to req obj
        const users = await User.find({clerkId: {$ne: currentUser}}); //get all users except the current user
        res.status(200).json(users);
     } catch (error) {
        next(error);
     }
};

export const getAllMessages = async (req, res, next) => {
   try {
      const id = req.auth.userId;
      const {userId} = req.params;
      const messages = await Message.find({
         $or: [
            {senderId: id, receiverId: userId},
            {senderId: userId, receiverId: id}
         ]
      }).sort({createdAt: 1});

      res.status(200).json(messages);
   } catch (error) {
      next(error);
   }
};
