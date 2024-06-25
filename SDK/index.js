async function getAllUsers() {
    try {
      const response = await fetch("http://localhost:3000/users"); // Ensure http:// is specified
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