var config = require('../config')

withdraw = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		let address = obj.address;
		let withDrawVal = obj.input_value;
		let user_id = obj.user_id;
		let type = 1;
		
		if( withDrawVal && Number(withDrawVal)>0 &&address &&config.utils.invalidAddress(address)){
			let userExist = await config.utils.isExistUserId(config,user_id);
			if(userExist){
				let user = await config.userData.findOne({where:{user_id:user_id}});
				if(user && Number(user.valuex_token)>Number(withDrawVal)){
					let data='';
					//if(type==1){//token提现
						let symbol = config.configdata.symbol;
						console.log("sybmol---:",symbol)
						let value = Number(withDrawVal)*10**Number(symbol);
						data= await config.instanceToken.methods.transfer(address,"100").encodeABI();
						
					// }else if(type==2){//etz提现
					// 	global.withdrawIndex = true;
					// }
					await config.withdrawData.create({
			          "timestamps":new Date().getTime(),
			          "txhash":"0x000",
			          "endtime":0,
			          "state":0,
			          "valuex":value,
			          "address":address.toLowerCase(),
			          "user_id":user.e_id,
			          "type":type,
			          "data":data
			        })
			        global.withdrawIndex_token = true;
			        
			    	return res.send(config.utils.result_req(0,"10010","withdraw success"))
					
				}
				return res.send(config.utils.result_req(-1,"10011","balance invalid"))
			}
			return res.send(config.utils.result_req(-1,"10011","user_id not existed"))
		}
      return res.send(config.utils.result_req(-1,"10011","params or user invalid"))
	}catch(e){
		config.logger.error("withdraw",config.utils.getFullTime(),e)
      return res.send(config.utils.result_req(-2,"10012","net error"))
	}
	
}

module.exports = 
{
	withdraw
}
