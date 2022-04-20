


const mongoose=require('mongoose');


async function  DbConnect() {

   
try {
    await mongoose.connect('mongodb+srv://user-sanjay:sanjay1234@sanjay.fomjy.mongodb.net/SanjayDatabse?retryWrites=true&w=majority',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });
    console.log(" we are coonected to databse db result ");

} catch (error) {
    
    console.log("error of db we are not connect with data base");

    console.log(error);
}
  
    
}


module.exports=DbConnect;

