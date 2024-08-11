const { getCampaignsForUser, getQueueSize ,getAllCampaigns} = require('user-sdk-1428');


const RequestQueue = require("./requestHandler");
const { UIS } = require('.');

async function abc() {
    for (let i = 0; i < 200; i++) {
        const startTime = new Date(); // Record start time
        let res= await getCampaignsForUser("1223");
        console.log(res," Call happend ::", i , "times");
       
        const endTime = new Date(); // Record end time
        const duration = (endTime - startTime) / 1000; // Calculate duration in seconds
        console.log(`Time taken: ${duration} seconds`);
   
    
}
}



let z=0;
// setInterval(()=>{
//     const queueSize = getQueueSize();
//     if(queueSize==0)z=0;
//     z++;
//     console.log("Time taken",z);
    
//     console.log(`Current queue size: ${queueSize}`);
// },100)



// for(let i=0;i<100;i++){
//     const startTime = new Date(); // Record start time

//     let ans=   getCampaignsForUser("1223");

//      const endTime = new Date(); // Record end time
//         const duration = (endTime - startTime) / 1000; // Calculate duration in seconds
//         console.log(`Time taken: ${duration} seconds`);
// }



    
    // Check queue size




