const Tx = require('ethereumjs-tx');
const axios = require("axios");

async function sendTx_token(config,from,to,value,private,index,id,ids){
  
  try {
      let nonce = await global.web3.eth.getTransactionCount(from)
      
      let gasss = await eth_gasPrice(config)
      let datas = await config.instanceToken.methods.transfer(to,value).encodeABI();
      var txObject = await global.web3.eth.accounts.signTransaction({
          from:from,
          to: config.tokenAddress,
          data: datas,
          gasPrice: gasss,
          gasLimit: '0x9770',
          nonce: nonce++,
          value:0
      }, "0x"+private)
      global.web3.eth.sendSignedTransaction(txObject.rawTransaction)
      .once('transactionHash', onSended(config,value,index,id,ids))
        .once('confirmation', onSuccess(config,value,index,id,ids))
        .once('error', onError(config,value,index,id,ids))
  } catch (e) {
      console.log("first err:",e);
      return null;
  }
}

function onSuccess(config,value,index,e_id,ids){
 var dosucess =async (confNumber, receipt) => {
   let hash = receipt.transactionHash;
   console.log("success hash:",hash)
   if(index==1){//iscalculte 2 已经归集
   		await config.userData.update({iscalculte:2},{where:{e_id:e_id}});
   }else if(index==2){
   		let user = await config.userData.findOne({where:{e_id:ids}});
      if(user){
        let amount = Number(user.valuex_token)-Number(value)/10**Number(config.configdata.symbol);
        await config.withdrawData.update({txhash:hash,state:2},{where:{e_id:e_id}});
        await config.userData.update({valuex_token:amount},{where:{e_id:ids}});
      }
   		
   }
   
 }
 return dosucess

}

function onSended(config,index,e_id){
 return async (hash) => {
   
   if(index==1){//iscalculte。4 归集中
   		await config.userData.update({iscalculte:4},{where:{e_id:e_id}});
   }else if(index==2){
   		await config.withdrawData.update({txhash:hash,state:4},{where:{e_id:e_id}});
   }
 }
}
function onError(config,e_id){
 var doerror = async (error) => {
   console.log("error:",error)
   if(index==1){//iscalculte。1 归集失败。下一周期归集
   		await config.userData.update({iscalculte:1},{where:{e_id:e_id}});
   }else if(index==2){
   		await config.withdrawData.update({txhash:hash,state:3},{where:{e_id:e_id}});
   }
 }
 return doerror
}
async function callBlockNumber(config){
    return await global.web3.eth.getBlockNumber()
 
}

async function callBalance(config,from){
	return await global.web3.eth.getBalance(from)
}
async function eth_getBlockByNumber(config,blockNumber,flat){
	return await global.web3.eth.getBlock(blockNumber, flat);
	 
}
async function eth_getTransactionByHash(config,hash){
	return await global.web3.eth.getTransaction(hash)
}
async function eth_getTransactionReceipt(config,hash){
	return await global.web3.eth.getTransactionReceipt(hash)
}
async function eth_gasPrice(config){
	return await global.web3.eth.getGasPrice();
}



module.exports ={
	sendTx_token,callBalance,callBlockNumber,eth_getBlockByNumber,eth_getTransactionByHash,eth_getTransactionReceipt
}