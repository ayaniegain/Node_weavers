import { addNewUser, getLoggedIn } from "../services/auth.service.js";


export async function register(req, res) {

  let {fullname,email,password}=req.body

  let userData={fullname,email,password}
  try {

  const userExists = await getLoggedIn(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }


    const registerUser = await addNewUser(userData); 
 res.status(201).json({ message: "User registered successfully", user: registerUser })
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function login(req, res) {
  let {email,password}=req.body

  try {
    const user = await getLoggedIn(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    if (user.password!=password) {
     return res.status(401).json({ message: "Invalid password" });
      
    }
    res.status(200).json({"message":`${result.fullname} logged in successfully`}); 

  } catch (error) {
    res.status(500).json({ error: "Login failed"  });
  }
}
