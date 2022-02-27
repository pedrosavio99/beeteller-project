const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try { 
		//teste para validação de daods enviados

		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		//variavel user criada para encontrar no bd um email solicitado e retornar um erro de duplo email
		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });


		const salt = await bcrypt.genSalt(Number(process.env.SALT)); //mais uma varivels de ambiente para gerarmos o hash
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		//criação de novo usuário com senha criptografada 
		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });


	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;