import Auth from "../model/auth.model.js";

export async function addNewUser(userData) {

  
  const newUser = new Auth(userData);

  return await newUser.save();
}

export async function getLoggedIn(email) {

  return await Auth.findOne({ email });
}

// export async function loggedOut(_id) {

//   return await Auth.findByIdAndDelete({ _id });
// }
