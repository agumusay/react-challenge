const mongoose = require('mongoose');

const connectDb = handler => async (req, res) => {
	if (mongoose.connections[0].readyState) {
		//Use existing connection
		return handler(req, res);
	}
	//Use new db connection
	await mongoose.connect('mongodb://localhost:27017/myapp', {});
	return handler(req, res);
};

export default connectDb;
