var config = require('../config');

findTransaction = async (req, res, next) => {
	try{
		let obj = config.utils.getObjParams(req);
	    let hash = obj.hash;
	    if(hash && config.utils.invalidHash(hash)){
	    	let tx = await config.etzMethod.eth_getTransactionReceipt(config,hash);
	    	if(tx){
	    		return res.send(config.utils.result_req(0,"10010",tx))
	    	}
      		return res.send(config.utils.result_req(-1,"10011","data null"))
	    }
	    return res.send(config.utils.result_req(-1,"10011","params invalid or not txhash"))	
			
	}catch(e){
		config.logger.error("findTransaction",config.utils.getFullTime(),e)
      return res.send(config.utils.result_req(-2,"10012","net error"))
	}
	
}

module.exports = 
{
	findTransaction
}
