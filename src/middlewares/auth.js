const adminAuth = (req,res,next)=>{
    console.log("admin auth is checking");
     const token = "xyz";
     const isAdminAuthorized = token === 'xyz'
    if(!isAdminAuthorized){
        res.status(401).send("unauthorized request.");
    }
    else{
        next();
    }
};

const userAuth = (req,res,next)=>{
    console.log("user auth is checking");
     const token = "xyz";
     const isAdminAuthorized = token === 'xyz'
    if(!isAdminAuthorized){
        res.status(401).send("user is unauthorized.");
    }
    else{
        next();
    }
};

module.exports = {adminAuth,userAuth}