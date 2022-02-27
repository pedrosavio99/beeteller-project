import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Navbt from "../Navbar";

const Signup = () => {

    //salvar estado do formulário de login
	const [data, setData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
	});


    //exibir erros NO FRONT DA PAGINA
	const [error, setError] = useState("");

    //CONSTANTE PARA PERMITIR O REDIRECIONAMENTO DE ROTAS
	const navigate = useNavigate();


    //FUNÇÃO PARA ATUALIZAR OS DADOS NO ESTADO DO FORMULARIO
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value }); //AQUI TEMOS A UMA ATRIBUIÇÃO DOS VALORES DAS HAVES DOS DADOS DE ACORDO COM O NAME DO INPUT
	};


    //FUNÇÃO ASSINCRONA PARA ESPERAR O O SUBMIT E SUA RESPOSTA
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            //TRATAMENTOS DOS ERROS 
			const url = "http://localhost:8080/api/users"; //ATENÇÃO ESSA URL PRECISA VIRAR UMA VARIAVEL DE AMBIENTE
			const { data: res } = await axios.post(url, data);  
			navigate("/login");
			console.log(res.message);
		} catch (error) {
			if (
                //PAGAR ERROS DO METODO GET 400 pois é erro interno do usuário e vai chamar o erro de nossa api JWT E JIO
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

    //RETONRO DO FRONTEND

	return (
		<>
		
		<Navbt/>

		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sing in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="First Name"
							name="firstName"
							onChange={handleChange}
							value={data.firstName}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Last Name"
							name="lastName"
							onChange={handleChange}
							value={data.lastName}
							required
							className={styles.input}
						/>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>

						{error && <div className={styles.error_msg}>{error}</div>}



						<button type="submit" className={styles.green_btn}>
							Create
						</button>

						
						<Link to="/login">
							<button type="submit" className={styles.green_btnHdn}>
								Sing in
							</button>
						</Link>

					</form>
				</div>
			</div>
		</div>
		</>
	);
};

export default Signup;