import app from "./app.js"
let PORT =8000 // shall i import .env file here?

app.listen(PORT, () => {
  console.log(`PORT is listen on  ${PORT} ✅`)
})
