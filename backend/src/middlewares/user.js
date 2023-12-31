const validUserData = (req, res, next) => {

  const { name, userName, password } = req.body;
  if(!name || !userName || !password){
    return res.status(409).json({
      msg: "Enter valid details"
    });
  };

  const validData = userSchema.safeParse(req.body)
  if(!validData.success){
    return res.status(409).json({
      msg: "Enter valid userName and password",
      errors: validData.error.errors
    });
  };
  req.validUserData = validData.data;
  next();
}
