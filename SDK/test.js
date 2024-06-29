const {getAllUsers,postUsers,viewedPageEvent,getUserEvents,getAllCampaigns} =require('./index.js');

async function hue(){
    // let res=await viewedPageEvent("1223","Add to cart");
    // console.log(res);
    getAllCampaigns();
    
}


hue();

