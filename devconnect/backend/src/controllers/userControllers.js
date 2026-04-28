const registerUser = (req,res)=>{
    res.send("ye lo saare users")
}

const loginUser = (req,res)=>{
    res.send("new user is created")
}

const getUserProfile = (req,res) =>{
    res.send("ye lo is id waala user")
}

module.exports = {registerUser,loginUser,getUserProfile}

