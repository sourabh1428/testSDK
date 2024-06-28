const {getAllUsers,postUsers,viewedPageEvent,getUserEvents} =require('./index.js');

async function hue(){
    let res=await getUserEvents(1223);
    console.log(res);

}

hue();

