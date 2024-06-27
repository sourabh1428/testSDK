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
  
  


  getAllUsers();

  
  
  
  module.exports=getAllUsers;