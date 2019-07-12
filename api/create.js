var config = require('../config')

create = async (req, res, next) => {
  try{
    let obj = config.utils.getObjParams(req);
    let user_id = obj.user_id;
    if(user_id ){
      let userExist = await config.utils.isExistUserId(config,user_id);
      if(!userExist){
        global.userIdArr.push(user_id);
        global.startCreate=true;
        return res.send(config.utils.result_req(0,"10010","success"))
      }
      return res.send(config.utils.result_req(-1,"10011","user_id existed"))
    }
    return res.send(config.utils.result_req(-1,"10011","params invalid or existed"))
  }catch(e){
    config.logger.error("calculate",config.utils.getFullTime(),e)
    return res.send(config.utils.result_req(-2,"10012","net error"));
  }
  
}

module.exports = 
{
  create
}
