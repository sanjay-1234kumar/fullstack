

const mongoose=require('mongoose');


const Schema=mongoose.Schema;

const AmzonProductSchema= new Schema({

    cater:{type:String,required:true},
    name:{type:String,required:true},
    brand:{type:String,required:true},
    imlink:{type:String,required:true},
    buylink:{type:String,required:true},
    rating:{type:Number,required:true},
    
});

module.exports=mongoose.model('AmzonProduct',AmzonProductSchema);