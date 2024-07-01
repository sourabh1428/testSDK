const {getCampaignsForUser,getAllUsers,postUsers,viewedPageEvent,getUserEvents,getAllCampaigns,postCampaign,UIS} =require('./index.js');



async function abc(){
    for(let i=0;i<10;i++){
        const startTime = new Date(); // Record start time
        const res = await getCampaignsForUser("1223"); // Await the response
        const endTime = new Date(); // Record end time
        const duration = (endTime - startTime) / 1000; // Calculate duration in seconds
        console.log(`Time taken: ${duration} seconds`);
    
    }
    
}
const queueSize = RequestQueue.getQueueSize();
console.log(`Current queue size: ${queueSize}`);

abc();

