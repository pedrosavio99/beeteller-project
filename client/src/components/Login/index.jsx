
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import Navbt from "../Navbar";

const Login = () => {

    //ESTADO PARA ARMAZENAR O EMAIL E SENHA PARA CONSULTA AO BANCO
	const [data, setData] = useState({ email: "", password: "" });

    //ERRO PARA MOSTRAR NO TEMPLATE
	const [error, setError] = useState("");

	//FUNÇÃO PARA MUDAR A SENHA
	const handlePassword = () => {
		console.log("change password with put mongoDb")
	};


    //FUNÇÃO PARA ATUALIZAR OS DADOS NO ESTADO DO FORMULARIO
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    //FUNÇÃO ASSINCRONA PARA ESPERAR O O SUBMIT E SUA RESPOSTA
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth"; //LEMVRESSE DESSAS VARIAVEIS
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
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
		<div className={styles.login_container}>
				
			<div className={styles.login_form_container}>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sing Up
						</button>
					</Link>
				</div>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Hello! Welcome Back.</h1>
						<p>Log in with your data entered during your registration.</p>
						<label><b>Email</b></label>
						<input
							type="email"
							placeholder="Example@email.com"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<div className={styles.forgot} >
						<label><b>Password</b></label>
						<h3 onClick={handlePassword}>Forgot your password?</h3>
						</div>
						
						<input
							type="password"
							placeholder="Enter Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Login
						</button>

						<Link to="/signup" >
						<button type="button" className={styles.green_btnHidden}>
							Sing Up
						</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
		</>
	);
};

export default Login;