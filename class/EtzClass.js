var axios = require('axios');
var config = require('../config');
var Funs = require("../task/etz/functions")

class EtzClass{
  constructor(){
    this.confirm = 3;
    this.currentBlockNumber = 8356019;
    this.netBlock=0;
    this.count=0;
    this.hashSet = new Set();
    this.addressSet =new Set() ;
    this.contractAddArr = new Set();
    this.privateMap = new Map();
    this.withTag = 0;
    this.settle=0;
    this.hasCreate = false
  }
  async start(){
    await this.init();
    this.currentBlockNumber = await config.etzMethod.callBlockNumber(config);
    let blo = await config.getAsync("blockNumber")
    if(blo){
      this.currentBlockNumber = Number(blo)-10
    }
    this.netBlock = Number(this.currentBlockNumber);
    this.currentBlockNumber++
    this.task()
  }
  async init(){
    let users = await config.userData.findAll()
    if(users!=null && users.length>0){
      for(var i=0;i<users.length;i++){
        this.addressSet.add(users[i].dataValues.address);
        this.privateMap.set(users[i].dataValues.address,users[i].dataValues.privates)
      }
    }
    this.contractAddArr.add(config.tokenAddress);
  }

  task(){
    let that = this
    setInterval(async function(){

      if(that.hasCreate){
         that.addressSet =new Set() ;
         that.privateMap = new Map();
        await that.init();
        that.hasCreate = false;
      }
      if(global.calculateStart){
         global.calculateStart = false;
         Funs.calculateFun(that.privateMap);
      }
      if(global.calculateStart_token){
          global.calculateStart_token = false;
         Funs.calculateFun_token(that.privateMap);
      }
      if(global.withdrawIndex){
        Funs.withdrawFun();
      }
      if(global.withdrawIndex_token){
        Funs.withdrawFun_token();
      }
      if(global.startCreate && global.userIdArr.length>0){
        Funs.create()
        global.startCreate=false;
        that.hasCreate=true;
      }
      
        that.count++;
         let nextBlock = await config.etzMethod.callBlockNumber(config);
         if(that.netBlock<=Number(nextBlock)){
            await config.setAsync("blockNumber",nextBlock)
           that.netBlock = Number(nextBlock);
          that.exFun()
          that.netBlock++;
        }
        if(that.count==1000){
          that.count=0
        }
        console.log("user number:",that.addressSet.size)
    },1000);

  }


  async exFun(){
      let that =this;
      if (that.currentBlockNumber < that.netBlock) {
          let cur = that.currentBlockNumber;
          that.currentBlockNumber = that.netBlock;

          console.log("cur====",cur)
          console.log("netBlock----",that.netBlock)
          try{
            for (let i = cur; i < that.netBlock; i++) {
             config.etzMethod.eth_getBlockByNumber(config,i-that.confirm, false).then(async function(block){
              if(block.transactions.length>0){
              for (let ii = 0; ii < block.transactions.length; ii++) {
                  let txhash = block.transactions[ii];
                      let tx = await config.etzMethod.eth_getTransactionByHash(config,txhash);
                      if(tx!=null && tx.from!=null && tx.to!=null){
                          let from = tx.from;
                          let to = tx.to;
                          let value = Number(tx.value); 
                          from = from.toLowerCase();
                          to = to.toLowerCase();
                          let times = new Date().getTime();
                         if(that.contractAddArr.has(to) && !that.hashSet.has(txhash)){//token 转账记录
                            
                            that.hashSet.add(txhash);
                            if(that.hashSet.size==20){
                              that.hashSet = new Set();
                            }
                            
                            let tx1 = await config.etzMethod.eth_getTransactionReceipt(config,txhash);
                            if(tx1.logs!=null && tx1.logs.length>0 && tx1.logs[0].topics!=null){
                              let tokenFrom = String(tx1.logs[0].topics[1]).replace("000000000000000000000000","").toLowerCase();
                              let tokenTo = String(tx1.logs[0].topics[2]).replace("000000000000000000000000","").toLowerCase();
                              let tokenValue = Number(tx1.logs[0].data);
                              
                              if(that.addressSet.has(tokenTo)){
                                console.log("tokenFrom:tokenTo:tokenValue  token-----------------",tokenFrom+","+tokenTo+","+tokenValue)
                                //保存代币充值记录
                                  await config.depositTokenData.create({
                                    txhash:txhash,
                                    blocknumber:i,
                                    timestamps:times,
                                    state:1,
                                    valuex:tokenValue,
                                    address:tokenTo,
                                    fromadd:tokenFrom
                                  })
                                  let user = await config.userData.findOne({where:{address:tokenTo}});
                                  if(user){
                                    let amount = Number(user.valuex_token)+Number(tokenValue)/10**Number(config.configdata.symbol);//iscalculte 1 等待归集
                                    config.userData.update({valuex_token : amount,update_time:times,iscalculte:1},{where:{e_id:user.e_id}});
                                  }
                              }
                            }
                          }else if(that.addressSet.has(to)  && !that.hashSet.has(txhash)){//etz 转账记录 
                            console.log("from:to:value etz-----------------",from+","+to+","+value)
                            that.hashSet.add(txhash);
                            if(that.hashSet.size==20){
                              that.hashSet = new Set();
                            }                               
                              await config.depositData.create({
                                txhash:txhash,
                                blocknumber:i,
                                timestamps:times,
                                state:1,
                                valuex:tx.value,
                                address:to,
                                fromadd:from
                              })
                              let user = await config.userData.findOne({where:{address:to}});
                              if(user){
                                let amount = Number(user.valuex)+Number(value)/10**18;//iscalculte 1 等待归集
                                config.userData.update({valuex : amount,update_time:times,iscalculte:1},{where:{e_id:user.e_id}});
                              }
                          }
                      }
                }
              }
              })
            }
          }catch(e){
              that.currentBlockNumber-=5;
                  console.log(e);
          }
        }
  }
  
}



var etz = new EtzClass()
etz.start()



