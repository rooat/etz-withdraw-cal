var config = require("../../config")
const ethers = require('ethers');

async function calculateFun(privateMap){
    let addressArr = await config.userData.findAll({where:{iscalculte:1}});//1 等待归集
    if(addressArr !=null && addressArr.length>0){
          for(var i=0;i<addressArr.length;i++){
            let balance = await config.etzMethod.callBalance(config,addressArr[i].dataValues.address);
            await config.etzMethod.sendTx(config,addressArr[i].dataValues.address,config.controllerAdd2,Number(balance),privateMap.get(addressArr[i].dataValues.address),1,addressArr[i].dataValues.e_id,-1)
            await sleep(2000)
          }
    }
  }

async function create(){
      for(var jk=0;jk<global.userIdArr.length;jk++){
        let user_id = global.userIdArr.pop();
        let mnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
        if (ethers.utils.HDNode.isValidMnemonic(mnemonic)) {
          let wallet = ethers.Wallet.fromMnemonic(mnemonic);
          let privates = wallet.privateKey;
          let user = await config.userData.findOne({where:{user_id:user_id}});
          if(!user){
           await config.userData.create({
              user_id:user_id,
              privates: privates.substring(2,privates.length),
              path: wallet.path,
              address: wallet.address.toLowerCase(),
              mnemonic: mnemonic,
              timestamps:new Date().getTime(),
              state:0,
              valuex:0,
              iscalculte:0
            } );
          }
        } 
      }
      if(global.userIdArr.length==0){
        global.userIdArr = new Array()
      }
  }

 async function withdrawFun(){
    let withdraw = await config.withdrawData.findOne({where:{state:0}});
    if(withdraw!=null){
      let e_id = withdraw.e_id;
      let user_id = withdraw.user_id;
      await config.withdrawData.update({state:1},{where:{e_id:e_id}});
      await config.etzMethod.sendTx(config,config.controllerAdd,withdraw.address,withdraw.valuex,config.controllerPrivate,2,e_id,user_id);
      
    }else{
      global.withdrawIndex = false;
    }
  }




function sleep(time = 0) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    })
  }

module.exports={
	calculateFun,create,withdrawFun
}


