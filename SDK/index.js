const axios = require("axios");

// require('dotenv').config();

const RequestQueue = require("./requestHandler");

const requestQueue = new RequestQueue(); // Set interval to 2000ms

function wrapWithQueue(func) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            requestQueue.add(async () => {
                try {
                    const result = await func(...args);
                    resolve(result);
                } catch (error) {
                    reject(error);
                }
            });
        });
    };
}

// Configure Bottleneck
async function getAllUsers() {
    try {
        const response = await fetch("https://testsdk.onrender.com/users");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const users = await response.json();
        console.log(users);
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

async function postUsers(name, email, ID) {
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

async function addEventByUser(MMID, eventName) {
    try {
        const response = await axios.post("https://testsdk.onrender.com/events/viewedPage", {
            MMID: MMID,
            eventName: eventName
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}

async function getUserEvents(MMID) {
    try {
        const response = await axios.get(`https://testsdk.onrender.com/events/userEvents?MMID=${MMID}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}


async function getAllCampaigns(){
    try{

        const response = await axios.get("https://testsdk.onrender.com/campaigns/getAllCampaign");
    
        const campaigns = await response.data;
        console.log(campaigns);
        return campaigns;


    }catch(error){
        console.log(error);
    }
}

async function getParticularCampaign(data) {
    try {
      const response = await axios.post("https://testsdk.onrender.com/campaigns/getParticularCampaign", {
        cid: data
      });
      return response.data; // Return the actual data
    } catch (error) {
      console.error("Error fetching campaign:", error); // Log the error
      throw error; // Optionally, rethrow the error if you want to handle it further up the chain
    }
  }
  
async function postCampaign(type,event,description,name,imageURL){
  
    try{


        const response = await axios.post("https://testsdk.onrender.com/campaigns/postCampaign",{
            type:type,
            event:event,
            description:description,
            name:name,
            imageURL:imageURL
        });
       

        let users=await UIS(response.data);
        const campaigns = await response.data;
        if(users && campaigns){
        console.log("Campaign created successfully",users);
    }
        return campaigns;


    }catch(error){
        console.log(error);
    }



}


//              /UIS/:segment_id

async function UIS(segment_id){
    console.log("UIS----------------------------------------------------------------");
    console.log(segment_id , "--------------------------------");
    try{
        
       

              let allUser=  fetch(`https://testsdk.onrender.com/campaigns/UIS/${segment_id}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ some: 'data' })
                })
                .then(response => response.json())
                .then(data =>data)
                .catch(error => console.error('Error:', error));


                return allUser;

    }catch(error){

            console.log("UIS FAILURE");

    }



}



async function getCampaignsForUser(MMID){
    try{
    const response=await axios.get(`https://testsdk.onrender.com/campaigns//getCampaignsForUser?MMID=${MMID}`)
    return response.data;    
}catch(error){
        
    console.log("Error while getting campaigns for "," ", MMID);
    }

}

// setgmentation refresh in every 10 seconds



    

    // UIS()


  





// Wrap each function with the rate limiter and queue

module.exports = { 
    getCampaignsForUser:wrapWithQueue(getCampaignsForUser),
    getAllUsers: wrapWithQueue(getAllUsers), 
    postUsers: wrapWithQueue(postUsers), 
    addEventByUser: wrapWithQueue(addEventByUser), 
    getUserEvents: wrapWithQueue(getUserEvents),
    postCampaign: wrapWithQueue(postCampaign),
    getAllCampaigns: wrapWithQueue(getAllCampaigns),
    UIS: wrapWithQueue(UIS),
    getParticularCampaign:wrapWithQueue(getParticularCampaign),
    getQueueSize: () => requestQueue.getQueueSize()
};