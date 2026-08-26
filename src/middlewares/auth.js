const adminAuth = (req, res, next)=>{
    const token = "xyz"
    const isAdminAuthorized = token === "xyz"
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorised request")
    } else{
        next();
    }
}


const userAuth = (req, res, next)=>{
    const token = "abv"
    const isUserAuthorized = token === "abv"
    if(!isUserAuthorized){
        res.status(401).send("Unauthorised request")
    } else{
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth,
}