import app from "./app.js"
import dotenv from 'dotenv'
dotenv.config()

let PORT =8000 

app.listen(PORT, () => {
  console.log(`PORT is listen on  ${PORT} ✅`)
})
