class Apiresponse{
	constructor(
		statusCode,
		data = null,
		message = "Success",
		errors = []
	){
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
		this.errors = errors;
		this.success = statusCode < 400;
	}
}

export { Apiresponse };