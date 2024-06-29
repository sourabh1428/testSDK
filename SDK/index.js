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
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const campaigns = await response.json();
        console.log(campaigns);
        return campaigns;


    }catch(error){
        console.log(error);
    }
}

async function postCampaign(type){
    if(typeof type === String){
    try{


        const response = await axios.post("https://testsdk.onrender.com/campaigns/postCampaign",{
            type:type
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        

        let users=await UIS(response);
        const campaigns = await response.json();
        console.log("Campaign created successfully",users);
        return campaigns;


    }catch(error){
        console.log(error);
    }
}
console.log("Type should be string");

}


//              /UIS/:segment_id

async function UIS(segment_id){

    try{

        const response = await axios.get(`https://testsdk.onrender.com/campaigns/UIS/:${segment_id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const campaigns = await response.json();
        console.log(campaigns);
        return campaigns;


    }catch(error){



    }



}







module.exports = { getAllUsers, postUsers, viewedPageEvent, getUserEvents,postCampaign,getAllCampaigns};
