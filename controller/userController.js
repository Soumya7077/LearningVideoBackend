const { default: mongoose } = require("mongoose");
const userDetailsModel = require("../model/userDetailsModel");
const userModel = require("../model/userModel");
const auditTrailModel = require("../model/auditTrailModel");

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
    const documents = await userModel.findOne({ email: email.trim() });

    if (documents) {
      if (documents.password === password.trim()) {
        const userDetails = await userDetailsModel.findOne({
          userId: documents._id,
        });
        await storeLoggedInUserData(documents._id);
        res.status(200).json({
          user: documents,
          userDetails: userDetails,
          message: "Loggedin Successfully"
        });
      } else {
        res.send("Invalid Password");
      }
    } else {
      res.send("Username does not exist, Kindly Signup first");
    }
  } catch (err) {
    res.status(500).json({ error: "Error in login" });
  }
};

/**================================Login validation===================== */

/**================================Sign up user========================= */

const registerUser = async (req, res) => {
  const { name, email, userType, password } = req.body;
  const user = {
    name: name,
    email: email,
    userType: userType,
    password: password,
    isActive: 1,
  };

  try {
    const isUserExist = await userModel.findOne({ email: email });
    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new userModel({
      name: name,
      email: email,
      password: password,
      userType: userType,
      isActive: 1,
    });
    const user = await newUser.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**================================Sign up user========================= */

/**================================Update user========================= */

const updateUser = async (req, res) => {
  try {
    const { name, email, password, dob, phone } = req.body;
    const { id } = req.params;

    // Update userModel
    const updatedUser = await userModel.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          name: name,
          email: email,
          password: password,
          phone: phone
        },
      },
      { new: true } 
    );

    // Update userDetailsModel
    const updatedUserDetails = await userDetailsModel.findOneAndUpdate(
      { userId: new mongoose.Types.ObjectId(id) },
      {
        $set: {
          dob: dob,
          displayName: name,
        },
      },
      { new: true } 
    );

    if (!updatedUser || !updatedUserDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: updatedUser,
      userDetails: updatedUserDetails,
      message: "User Updated Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating user" });
  }
};


/**================================Update user========================= */


/**======================================Store Logged In User Data =================== */

const storeLoggedInUserData = async(userId) => {
  const dateTime = new Date()
  const createAuditTrail = new auditTrailModel({userId: userId, loginDate: dateTime});

  const auditTrail = await createAuditTrail.save();
  console.log(auditTrail);
  

}


/**======================================Store Logged In User Data =================== */

module.exports = { getUser, validateLogin, registerUser, updateUser };
