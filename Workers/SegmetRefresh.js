const {getAllCampaigns,UIS} = require('user-sdk-1428');


async function hue(){
    let ans=await getAllCampaigns();
  
        for(let i=0;i<ans.length;i++){
            let x=UIS(ans[i].segment_id);
            console.log("segment refreshed it's segment id: "+ans[i].segment_id);
         
        }
  
  }
  
  setInterval(() => {
    hue();
  }, 10000);