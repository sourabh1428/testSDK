const { getParticularCampaign,getCampaignsForUser, getQueueSize ,getAllCampaigns,smartTrigger,addEventByUser} =require('./index');;


const RequestQueue = require("./requestHandler");
const { UIS } = require('.');






// setInterval(()=>{
//     const queueSize = getQueueSize();
//     if(queueSize==0)z=0;
//     z++;
//     console.log("Time taken",z);
    
//     console.log(`Current queue size: ${queueSize}`);
// },100)




   



async function abc(){
    try{
    let ans=await addEventByUser("1223","Add to cart");
    console.log(ans);
    }
    catch(error){
        console.log(error);
        
    }
    

}
abc();

    
    // Check queue size




