const crypto = require('crypto'); 
const ethers = require('ethers');
const ethereum = require('ethereumjs-util')
const UUID = require('uuid');
let uuid = md5(UUID.v1())

function md5(pwd){
	return crypto.createHash('md5').update(String(pwd)).digest("hex")
}


async function isExistUserId(config,userId){
	let user = await config.userData.findOne({where:{user_id:userId}})
	if(user){
		return true
	}
	return false;
}


function getObjParams(req){
	if(JSON.stringify(req.query)==="{}"){
		return req.body;
	}else if(JSON.stringify(req.body)==="{}"){
		return req.query;
	}
	return null;
}

function invalidHash(hash){
	if(hash.substr(0,2)=='0x' && hash.length==66){
		return true
	}
	return false;
}

function getTimeDate(){
	let dates = new Date()
	let years = dates.getFullYear();
	let months = dates.getMonth()+1;
	let dateday = dates.getDate();
	return years+"-"+months+"-"+dateday;
}

function getFullTime(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate();
	let hour = date.getHours();
	let min = date.getMinutes();
	let sec = date.getSeconds();
	return year+"-"+month+"-"+datex+" "+hour+":"+min+":"+sec
}

function nextWeekend(){
	let date = new Date();
	let day = new Date().getDay();
	let suday =0
	if(day!=0){
		suday = 7-day;
	}
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate()+suday;
	return year+"-"+month+"-"+datex+" 00:00:00";
}

function nextTimeFormat(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate()+1;
	return year+"-"+month+"-"+datex+" 00:00:00";
}
function lastTimeFormat(){
	let date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth()+1;
	let datex = date.getDate()-1;
	return year+"-"+month+"-"+datex+" 00:00:00";
}

function IsNumber(num){
	var reg=/^[0-9]+.?[0-9]*$/;
	if(reg.test(num)&& Number(num)>0){
		return true;
	}
	return false;
}
function IsDate(dates){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
	return reg.test(dates);
}
function IsDateSec(dates){
	var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
	return reg.test(dates);
}

function result_req(state,code,message){
	return {"resp":
		{
			"state":state,
			"code":code,
			"datas":message
		}
	}
}

function invalidAddress(address){
	return ethereum.isValidAddress(address);
}


module.exports={
	invalidHash,
	uuid,
	nextWeekend,
	invalidAddress,
	md5,
	isExistUserId,
	getObjParams,
	IsNumber,
	IsDate,IsDateSec,getTimeDate,getFullTime,nextTimeFormat,lastTimeFormat,result_req
}
