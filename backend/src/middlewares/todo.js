const validTodoData = (req, res, next) =>{
  const validData = todoSchema.safeParse(req.body)
  if (!validData.success) {
    return res.status(400).json({
      msg: "Invalid todo data",
      errors: validData.error.errors,
    });
  }
  req.validTodoData = validData.data;
  next();
}

const handelTodoErrors = (err, req, res, next) =>{
  console.error("Error in todo route")
  if(err.name == "ValidationError"){
    return res.status(400).json({
      msg: "Validation error in todo data",
      errors: err.errors
    });
  };
  res.status(500).json({
    msg: "Internal server error"
  })
};