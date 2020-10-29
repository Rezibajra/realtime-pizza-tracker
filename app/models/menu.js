//this file menu model represents table in mongodb database
//models are singular i.e menu/Menu
//tables/collections are plural i.e menus
const mongoose=require('mongoose')
const Schema=mongoose.Schema
const menuSchema=new Schema({
	name:{type:String,required:true},
	image:{type:String,required:true},
	price:{type:Number,required:true},
	size:{type:String,required:true}		
})
module.exports=mongoose.model('Menu',menuSchema)