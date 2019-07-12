const config = require('../../config');
const methods = require('./methods');
var calculateTime = 2000;
var withdrawData ;

class checkTx{
  async checkReceipt(){
    
    let check = await config.etzWithdraw.findAll({where:{state:0}})
    if(check.length>0){
      for(var k=0;k<check.length;k++){
        let receipt = await methods.eth_getTransactionReceipt(check[k].txhash);
        try{
          if(Number(receipt.status)>0 ){
          console.log("========ok check====")
            await config.etzWithdraw.update({"state":2,"endtime":new Date().getTime()},{where:{e_id:check[k].e_id}})

         }
        }catch(e){

        }
        
      }
    }
    
  }
  async start(){
    this.checkReceipt();
    let that = this
    setInterval(function(){
      if(global.withdrawIndex){
        global.withdrawIndex = false;
        that.checkReceipt();
      }
      
    },3000);
  }
}

var receiptx = new checkTx();
receiptx.start();


