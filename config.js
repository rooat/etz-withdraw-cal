 const Sequelize = require('sequelize');
 const Web3 = require('web3');
 const mysql = require('mysql');
 
 const logger = require('./logs/logger.js')
 const tips = require('./utils/tips')
 const utils = require('./utils/utils')
 const etzMethod = require('./utils/etzMethod')
 


const redis = require('redis');
const client = redis.createClient('6379','127.0.0.1');
client.on('error',function(error){
  console.log("client error",error);
});

const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);
const expireAsync = promisify(client.expire).bind(client);
const llenAsync = promisify(client.llen).bind(client);
const lpushAsync = promisify(client.lpush).bind(client);
const rpopAsync = promisify(client.rpop).bind(client);
const delAsync = promisify(client.del).bind(client);

const config = {
    database: 'eth_with_db',
    username: 'root',
    password: 'HWLhwl@#896',
    host: 'localhost',
    port: 3306
};
const config_mysql = {
    database: 'eth_with_db',
    user: 'root',
    password: 'HWLhwl@#896',
    host: 'localhost',
    port: 3306
};
//---------------------------------------------------

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    },
    timestamps: false
});

var connection = mysql.createConnection(config_mysql); 
connection.connect();


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
 var userData = sequelize.define('user_data',{
                        e_id:{
                            type:Sequelize.INTEGER(8),
                            primaryKey:true
                        },
                        address:Sequelize.STRING(50),
                        privates:Sequelize.STRING(100),
                        path:Sequelize.STRING(50),
                        mnemonic:Sequelize.STRING(150),
                        timestamps:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1),
                        valuex:Sequelize.DECIMAL(14,4),
                        user_id:Sequelize.STRING(30),
                        iscalculte:Sequelize.INTEGER(1)
                        
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });

 var depositData = sequelize.define('deposit_data',{
                        e_id:{
                            type:Sequelize.INTEGER(8),
                            primaryKey:true
                        },
                        timestamps:Sequelize.STRING(20),
                        txhash:Sequelize.STRING(150),
                        blocknumber:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1),
                        valuex:Sequelize.STRING(30),
                        address:Sequelize.STRING(50),
	 		fromadd:Sequelize.STRING(50),
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });



 var withdrawData = sequelize.define('withdraw_data',{
                        e_id:{
                            type:Sequelize.INTEGER(8),
                            primaryKey:true
                        },
                        timestamps:Sequelize.STRING(20),
                        txhash:Sequelize.STRING(150),
                        endtime:Sequelize.STRING(20),
                        state:Sequelize.INTEGER(1),
                        valuex:Sequelize.STRING(30),
                        address:Sequelize.STRING(50),
	 		user_id:Sequelize.BIGINT(11),
                    },{
                        freezeTableName:true,
                        timestamps: false
                    });


// var controllerAdd = "xxx";
// var controllerPrivate = "xxxx";

// var controllerAdd2 = "xxxxx";




global.web3 = null;
const rpc = 'http://etzrpc.orgs'

global.withdrawIndex=false;
global.newUser = {
state:false,
user_id:0
};
global.calculateStart = false;
global.newUser = {
state:false,
address:[]
};
global.startCreate = false;
global.userIdArr = new Array();

global.checkWithdraw = false;



module.exports = {
    Web3,
    rpc,
    etzMethod,
    connection,
    utils,
    userData,
    depositData,
    withdrawData,
    controllerAdd,
    controllerAdd2,
    controllerPrivate,
    getAsync,setAsync,expireAsync,llenAsync,lpushAsync,rpopAsync,delAsync,logger
}
  