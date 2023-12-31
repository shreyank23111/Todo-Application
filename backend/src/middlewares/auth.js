const validateLoginData = (req, res, next) =>{
  const {userName, password} = req.body;
  if(!userName || !password){
    return res.status(409).json({
      msg: "Enter valid details"
    });
  };
  const validData = userSchema.safeParse({userName, password})
  if(!validData.success){
    return res.status(409).json({
      msg: "Enter valid userName and password",
      errors: validData.error.errors
    });
  };
  req.validUserData = validData.data;
  next();
}

const handelAuthErrors=(err, req, res, next) =>{
  console.error("Error in authentication route", err)

  if(err.name === "ValidationError"){
    return res.status(404).json({
      msg: "Validation error in user data",
      errors: err.errors
    })
  }
  res.status(500).json({
    msg: "Internal server error"
  })

}

const validToken = (req, res, next) =>{
  const token = req.headers.authorization;
  console.log(token);

  if(!token){
    return res.status(401).json({
      msg: "Unauthorized - Missing token"
    })
  }
  try{
    const decoded = jwt.verify(token, jwtSecret)
    req.user = decoded;
    next()

  }catch (error){
    console.error("Error in validating token:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        msg: "Unauthorized - Invalid token"
      });
    } else {
      return res.status(500).json({
        msg: "Internal server error"
      });
    }
  }
  }
