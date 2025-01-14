import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connetDB from "./controlers/UserContrl.js";
import UserItem from "./models/UserItem.js";

dotenv.config();
const app = express();
app.use(express.json());

connetDB();

app.post('/api/user/login', async (req, res) => {
    const {email, password} = req.body;

    try{
        const user = await UserItem.findOne({email});
        if(!user){
            return res.status(404).json({message : 'User Not Found'});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid credentials"});
        }
        const token = jwt.sign(
            { id: user._id, role: user.role }, // Payload
            process.env.JWT_SECRET,           // Secret key
            { expiresIn: '1h' }               // Token valid 1 jam
          );

          res.status(200).json({
            message : 'Login Succes',
            token,
            user : {
                id : user._id,
                username : user.username,
                email : user.email,
                role : user.role,
            },
          });
    }
    catch(error){
        res.status(500).json({message : 'Server Error', error})
    }
}
)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`))