var config = require('../config');

calculate = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
		//let type = obj.type;
		//if(type==1){//token归集
			global.calculateStart_token = true;
		//}else if(type==2){//etz归集
	//		global.calculateStart = true;
	//	}
		
      return res.send(config.utils.result_req(0,"10010","success"))		
	}catch(e){
		config.logger.error("calculate",config.utils.getFullTime(),e)
      return res.send(config.utils.result_req(-2,"10012","net error"))
	}
	
}

module.exports = 
{
	calculate
}
