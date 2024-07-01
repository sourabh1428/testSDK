const { getCampaignsForUser, getQueueSize } = require('./index.js');


const RequestQueue = require("./requestHandler");

async function abc() {
    for (let i = 0; i < 100; i++) {
        const startTime = new Date(); // Record start time
        getCampaignsForUser("1223"); // Await the response
        const endTime = new Date(); // Record end time
        const duration = (endTime - startTime) / 1000; // Calculate duration in seconds
        console.log(`Time taken: ${duration} seconds`);
        
    }
}
setInterval(async ()=>{
   await console.log( getQueueSize());
},100)
abc();

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

