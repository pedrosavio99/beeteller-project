const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity"); //aqui retornaremos erros caso o usuário não informe uma senha valida



//esquema para novos usuários
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {  /// PERCEBA QUE JWTPRIVATEKEY É OUTRA VARIAVEL DE AMBIENTE E QUE ESSE TOKEN EXPIRARÁ EM 7DIAS
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);  //AQUI CRIAMOS UM NOVO USUÁRIO AO NOSSO BANCO DE DADOS



//AQUI VALIDAMOS SE OS DADS INSERIDOS PELO USUÁRIO SÃO ACEITOS PELO JWT
const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };