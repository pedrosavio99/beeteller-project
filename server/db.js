const mongoose = require("mongoose"); // esse sera o nosso banco de dados

module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DB, connectionParams); // variavel de ambiene DB onde devemos colocar o link de nosso banco de dados
		console.log("Connected to database successfully");
	} catch (error) {
		console.log(error);
		console.log("Could not connect database!");
	}
};