const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");


//CRIAÇÃO DA FUNÇÃO ASSINCRONA PARA PODERMOS ESPERAR A RESPOSTA DO BANCO DE DADOS COM NOSSA REQUISIÇÃO
router.post("/", async (req, res) => {
	try {

        //ERRO GERAL 
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });



        //ERRO DE EMAIL INVALIDO PARA NÃO FICAR NA CARA ONDE ESTA O ERRO EM CASO DE FRAUDE
		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });



        //ERRO DE SENHA INVALIDA PARA NÃO FICAR NA CARA ONDE ESTA O ERRO EM CASO DE FRAUDE
		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });


        //CRIAÇÃO DO TOKEN DE AUTENTIAÇÃO VALIDO POR 7 DIAS 
		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "logged in successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;