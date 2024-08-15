const { getParticularCampaign,getCampaignsForUser, getQueueSize ,getAllCampaigns} = require('./index');


const RequestQueue = require("./requestHandler");
const { UIS } = require('.');






// setInterval(()=>{
//     const queueSize = getQueueSize();
//     if(queueSize==0)z=0;
//     z++;
//     console.log("Time taken",z);
    
//     console.log(`Current queue size: ${queueSize}`);
// },100)




   

abc();

async function abc(){
    let ans=await getParticularCampaign("66be320c131b427b99d711a3");
    console.log(ans);
    console.log("above");
    

}


    
    // Check queue size




