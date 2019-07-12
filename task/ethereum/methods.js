const Tx = require('ethereumjs-tx');
var config = require('../../config')
const axios = require("axios");

 async function sendTx(from,to,value,private){
 	let ser = await signedTx(from,to,value,private);
 	return await methodX(config.method,[ser]);
	
}
async function signedTx(from,to,value,private){
	let nonce = await callNonce(from);
	 let gasPrice = await eth_gasPrice();
	 const privateKey = new Buffer.from(private, config.type)
	 value = Number(value) - Number(gasPrice)*50000
	 value = value.toString(16);
	const rawTx = {
	  nonce: nonce,
	  gasPrice: gasPrice,
	  gasLimit: '0xc350',
	  to: to,
	  value: "0x"+value,
	  data: ''
	}
	const tx = new Tx(rawTx);
	tx.sign(privateKey);
	const serializedTx = tx.serialize();
	return "0x"+serializedTx.toString("hex");
}
async function callNonce(from){
	let blockNumber = await callBlockNumber();
	console.log("blockNumber:;;;",blockNumber)
	return  methodX("eth_getTransactionCount",[from,blockNumber]);
}
function callBlockNumber(){
	return  methodX("eth_blockNumber",[])
}

async function callBalance(from){
	let balance =await methodX("eth_getBalance",[from,"latest"]);
	console.log("callBalance:",balance);
	return balance;
}
async function eth_getBlockByNumber(blockNumber,flat){
	 return methodX("eth_getBlockByNumber",[blockNumber,flat]);
	 
}
async function eth_getTransactionByHash(hash){
	return methodX("eth_getTransactionByHash",[hash]);
}
async function eth_getTransactionReceipt(hash){
	return methodX("eth_getTransactionReceipt",[hash]);
}
async function eth_gasPrice(){
	return methodX("eth_gasPrice",[]);
}

async function methodX(method_name,params){
	let res = await axios.post(config.ethurl,{"Content-Type":"application/json",
		"jsonrpc":"2.0",
		"method":method_name,
		"params": params,
		"id":1
	})
	return res.data.result;
}

module.exports ={
	sendTx,callBalance,callNonce,signedTx,callBlockNumber,eth_getBlockByNumber,eth_getTransactionByHash,eth_getTransactionReceipt
}