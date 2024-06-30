const axios = require("axios");

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

async function viewedPageEvent(MMID, eventName) {
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

async function postCampaign(type,event){
  
    try{


        const response = await axios.post("https://testsdk.onrender.com/campaigns/postCampaign",{
            type:type,
            event:event
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
    const response=await axios.get(`http://localhost:3000/campaigns//getCampaignsForUser?MMID=1223`)


}





module.exports = { getAllUsers, postUsers, viewedPageEvent, getUserEvents,postCampaign,getAllCampaigns,UIS};
