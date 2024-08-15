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
    let ans=await getParticularCampaign("66be26e75d86c14cabd74925");
    console.log(ans);
    console.log("above");
    

}


    
    // Check queue size




