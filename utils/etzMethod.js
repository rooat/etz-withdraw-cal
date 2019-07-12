const Tx = require('ethereumjs-tx');
const axios = require("axios");

 async function sendTx(config,from,to,value,private,index,id,ids){
  
 	try {
      let nonce = await global.web3.eth.getTransactionCount(from)
      
      let gasss = await eth_gasPrice(config)
      value = Number(value)/10**18-Number(gasss)*50000/10**18;
      
      value = String(value*10**6)
      let indexOfs = value.indexOf(".")
      if(indexOfs!=-1){
        value = value.substr(0,indexOfs);
      }
      value = value+"000000000000"
      var txObject = await global.web3.eth.accounts.signTransaction({
          from : from,
          to: to,
          data: '',
          gasPrice: gasss,
          gasLimit: '0x7530',
          nonce: nonce++,
          value: value
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
   if(index==1){//iscalculte 2 已经归集
   		await config.userData.update({iscalculte:2},{where:{e_id:e_id}});
   }else if(index==2){
   		let user = await config.userData.findOne({where:{e_id:ids}});
      if(user){
        let amount = Number(user.valuex)-Number(value)/10**18;
        await config.withdrawData.update({txhash:hash,state:2},{where:{e_id:e_id}});
        await config.userData.update({valuex:amount},{where:{e_id:ids}});
      }
   		
   }
   
 }
 return dosucess

}

function onSended(config,index,e_id){
 return async (hash) => {
   console.log("pendding hash:",hash)
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
  if(global.web3){
    return await global.web3.eth.getBlockNumber()
  }
  getWeb3(config)
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

async function getWeb3(config){
  try{
    let  provider = await new config.Web3(global.rpc)
    global.web3 = provider
  }catch(e){
    console.log(e)
    getWeb3(config)
  }

}


module.exports ={
	sendTx,callBalance,callBlockNumber,eth_getBlockByNumber,eth_getTransactionByHash,eth_getTransactionReceipt
}