import { Response,Request, RequestHandler } from "express";
import User from "../models/user";
import { producer, TOPICS } from '../config/kafka';

const createCurrentUser:RequestHandler=async(req,res)=>{

    try{
        const {auth0Id}=req.body;
        const existingUser=await User.findOne({auth0Id});

        if(existingUser) { 
            res.status(200).send(); 
            return;
        }

        const newUser=new User(req.body);
        await newUser.save();

        // Send Kafka event for user creation
        try {
            await producer.send({
                topic: TOPICS.USER_CREATED,
                messages: [
                    {
                        key: newUser._id.toString(),
                        value: JSON.stringify({
                            userId: newUser._id,
                            auth0Id: newUser.auth0Id,
                            name: newUser.name,
                            email: newUser.email,                         
                        })
                    }
                ]
            });
            console.log('User created event sent to Kafka');
        } catch (error) {
            console.error('Failed to send user created event to Kafka:', error);
        }

        res.status(201).json(newUser.toObject());

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Create User Error"})
        
    }

}

const updateCurrentUser = async (req: Request, res: Response) => {
    try {
      const { name, addressLine1, country, city } = req.body;

      const user = await User.findById( req.userId)
     
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.name = name;
      user.addressLine1 = addressLine1;
      user.city = city;
      user.country = country;
  
      await user.save();

      // Send Kafka event for user update
      try {
          await producer.send({
              topic: TOPICS.USER_UPDATED,
              messages: [
                  {
                      key: user._id.toString(),
                      value: JSON.stringify({
                          userId: user._id,
                          name: user.name,
                          addressLine1: user.addressLine1,
                          city: user.city,
                          country: user.country,                       
                      })
                  }
              ]
          });
          console.log('User updated event sent to Kafka');
      } catch (error) {
          console.error('Failed to send user updated event to Kafka:', error);
      }
  
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error updating user" });
    }
  };


const getCurrentUser=async(req:Request, res:Response)=>{

  try {

    const currentUser=await User.findOne({_id: req.userId})

    if(!currentUser){

      return res.status(404).json({message:"User not found"})
    }

    res.json(currentUser);
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Error occured"})
  }
} 

export default {
    createCurrentUser,
    updateCurrentUser,
    getCurrentUser,
}
