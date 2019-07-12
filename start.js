var config = require('./config')

async function calculateBalanceAll(userId,b_type_f){
    let lastdays = config.utils.lastTimeFormat();
    let sqlBenefit = "select sum(f_value) as sum from financedata where user_id=? and state=? and f_type=?";
    let params =[userId,1,b_type_f]
    let balance= await config.utils.queryFromSql(config,sqlBenefit,params);
    balance = balance.result[0].sum;
    return balance;
}

async function test(){
    let ss = await calculateBalanceAll(12,1)
    console.log("ddd--",ss)
}
test()