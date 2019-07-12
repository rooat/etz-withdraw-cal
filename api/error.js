let FAILURE=""

function error(code,state,message){
	return {
		code:code,
		state:state,
		message:message
	}
}

module.exports={
	error
}
