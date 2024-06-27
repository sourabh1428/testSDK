const { default: axios } = require("axios");

async function getAllUsers() {
    try {
      const response = await fetch("https://testsdk.onrender.com/users"); // Ensure http:// is specified
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const users = await response.json();
      console.log(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }
  
  // to post the users 
  
  async function postUsers(name,email,ID){
    try {
      const response = await axios.post("https://testsdk.onrender.com/postUser", {
        name: name,
        email: email,
        ID: ID
      });
  
      console.log("User added successfully:", response.data);
    } catch (error) {
      console.error("Error posting user:", error);
    }
  }
  
  // Usage example:




  
  
  
  module.exports={getAllUsers,postUsers};