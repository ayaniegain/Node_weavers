import {
  addNewUser,
  getLoggedIn,
  // loggedOut, 👍
} from "../services/auth.service.js";
import { createToken } from "../services/token.service.js";

// REGISTER
export async function register(req, res) {
  console.log(req.body)

  const { fullname, email, password } = req.body;
  const userData = { fullname, email, password };

  try {
    const userExists = await getLoggedIn(email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists", success: false });
    }

    const registerUser = await addNewUser(userData);

    if (!registerUser) {
      return res.status(500).json({ message: "User registration failed", success: false });
    }

    console.log("registerUser", registerUser);
    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to register user",
      success: false,
    });
  }
}

// LOGIN
export async function login(req, res) {
  const { email, password } = req.body;


  try {
    const user = await getLoggedIn(email);

    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password", success: false });
    }

    const userloggedin = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
    };

    console.log(userloggedin);

    //createtoken
    let token=await createToken(userloggedin)

    console.log(token)
    return res.status(200).json({
      message: `${userloggedin.fullname} logged in successfully`,
      success: true,
      data: userloggedin,
      token:{
        accessToken: token
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: "Login failed",
      success: false,
    });
  }
}
