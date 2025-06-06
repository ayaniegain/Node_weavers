import Address from "../model/address.model.js";
import Auth from "../model/auth.model.js";

export async function addNewUser(userData,userAddress) {

  // save address
  const newAddress = await Address.create(userAddress)
  userData.address = newAddress._id
  const newUser = new Auth(userData);
  return await newUser.save();
}

export async function getLoggedIn(email) {

  return await Auth.findOne({ email }).populate('address');
}

// export async function loggedOut(_id) {

//   return await Auth.findByIdAndDelete({ _id });
// }
