
const userModel = require("../model/userModel");

/**=============================Get All user list====================== */

const getUser = async (req, res) => {
  try {
    const users = await userModel.find({});
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err.message); // Log the error for debugging
    res.status(500).json({ error: "Error fetching users" });
  }
};

/**=============================Get All user list====================== */

/**================================Login validation===================== */

const validateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const documents = await userModel.findOne({ email: email });

    if (documents) {
      if (documents.password === password) {
        res.send(documents);
      } else {
        return "Invalid Password";
      }
    } else {
      return "Username does not exist, Kindly Signup first";
    }
  } catch (err) {
    res.status(500).json({ error: "Error in login" });
  }
};

/**================================Login validation===================== */


/**================================Sign up user========================= */

    const registerUser = async(req, res) => {
        const {name, email, userType, password} = req.body;
        const user = {
          name: name,
          email: email,
          userType: userType,
          password: password,
          isActive:1
        }

        try{
            const isUserExist = await userModel.findOne({email:email});
            if(isUserExist){
                return res.status(400).json({message: "User already exists"})
            }
    
            const newUser = new userModel({name:name, email:email, password:password, userType: userType, isActive:1})
            const user = await newUser.save();
    
            res.status(200).json(user);   
        }catch(err){
            res.status(500).json({message: err.message});
        }

    }

/**================================Sign up user========================= */


module.exports = { getUser, validateLogin, registerUser };
