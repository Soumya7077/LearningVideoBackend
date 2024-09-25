
const userModel = require("../model/userModel");


/**=============================Get All user list====================== */

const getUser = async () => {
    var usersList = await userModel();
    const documents = await usersList.find({}).toArray();
    return documents;
}

/**=============================Get All user list====================== */

/**================================Login validation===================== */

const validateLogin = async (uname, pwd) => {

    var userList = await userModel();
    const documents = await userList.findOne({userName: uname});
    if(documents){
        if(documents.password === pwd){
            return documents;
        }else{
            return "Invalid Password";
        }
    }else{
        return "Username does not exist, Kindly Signup first";
    }
}

/**================================Login validation===================== */


module.exports = { getUser, validateLogin };
