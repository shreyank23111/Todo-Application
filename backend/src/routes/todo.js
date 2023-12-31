const express =require("express")
const router = express.Router();

import Todo from "../db/schema/todoSchema"
app.use(validToken)
app.use(handelTodoErrors)

router.app.get("/todo", async(req, res) =>{
  try{
    const data = await Todo.find().exec();
    console.log(data);
    res.json(data)
  } catch (err){
    console.log(err);
    res.status(500).send("Error occurred")
  }
})

router.app.post("/todo", validTodoData, async(req, res) =>{
  try{
    const {title, description} = req.body;

   const newTodo = new Todo({
    title,
    description
   });

   const saveTodo = await newTodo.save()
   res.status(201).json({msg: "Your task saved successfully"})
  }catch (err){
    console.log(err);
    res.status(500).send("Data cnn't be saved due to an error")

  }

})

router.app.put("/todo/:id", validTodoData,async(req, res) =>{
  try{
    const id = req.params.id
    const {title, description} = req.body;

    const todo = await Todo.findById(id)

    if(!todo){
      return res.status(404).json({
        msg: "Todo not found enter a valid todo id"
      });
    };

    todo.title = title;
    todo.description = description;

    const upadatedTodo = await todo.save();
    res.json(upadatedTodo);
    
  }catch (err){
    console.log(err);
    res.status(500).json({
      msg: "Error in updating todo"
    })
  }

})

router.app.delete("/todo/:id", async(req, res) =>{
  try{
    const id = req.params.id;

  const todo = await Todo.findByIdAndDelete(id)
  if(!todo){
    return res.status(404).json({
      msg: "Todo not found invalid id"
    })
  }
    res.json({
      msg: "Todo deleted successfully"
    })
}catch(err){
  console.log(err);
  res.status(500).json({
    msg:"Error in updating to do"
  })
}
})
  

module.exports = router;
