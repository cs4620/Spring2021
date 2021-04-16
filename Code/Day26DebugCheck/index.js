import express from "express"
const app = express();

app.use("/", express.static("./"));

app.listen(9999, (err)=>{
  if(err) return console.error(err);
  console.log("Listening on http://localhost:9999")
})