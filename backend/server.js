const express = require("express");
const zod = require("zod");
const app = express();
const port = 3000;
app.use(express.json());
const main = require("./src/db/mongoConnection");




main();

const todoSchema =zod.object({
  title: zod.string().max(30).min(2),
  description: zod.string().min(2)
})

const userSchema = zod.object({
  // name: zod.string(),
  userName: zod.string(),
  password: zod.string().min(6)
})













app.listen(port, (req, res) =>{
  console.log(`App is listening on port ${port}`);
})