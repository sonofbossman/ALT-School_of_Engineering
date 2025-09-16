import express from "express"
import connect_to_db  from "./configuration/db_conn";

const app = express()

const port = process.env.PORT || 3000

const start = async () => {
  try{
    connect_to_db(process.env.MONGO_URI)
    console.info("Connection to database successful.")
    app.listen(port, ()=>{
      console.info(`Server is listening on port ${port}`)
    })
  } catch(err){
    console.error("Database connection error: ", err)
  }
}

start()