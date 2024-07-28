const mongoose=require('mongoose');
module.exports=()=>{
    try{
        mongoose.connect(process.env.MONGO_URL);
        console.log('Connected');
    }
    catch(e){
        console.lor('Error connecting to MongoDB');
    }
}