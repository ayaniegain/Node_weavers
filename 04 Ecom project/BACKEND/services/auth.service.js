import Auth from "../model/auth.model.js";

export async function addNewUser(userData) {

  console.log("user",userData)
  
  const newUser = new Auth(userData);

  return await newUser.save();
}

export async function getLoggedIn(userData) {
  return await Auth.findOne({ email: userData.email });
}
