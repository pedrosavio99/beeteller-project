import styles from "./styles.module.css";
import vetor from "../../img/Vector.png"
import logo from "../../img/logo.png"

const Navbt = () => {
	const handleChange2 = () => {
		console.log("change language")
	};

	return (
		<>
		<nav className={styles.navbar}>
		<div className={styles.nav1}>
			<h1><img src={logo} width="90"alt="description"/>  </h1>
			<h2>|  quotation</h2>
			<img src={vetor} width="10" alt="description"/> 
		</div>
			<div className={styles.nav2}>
				<h5 onClick={handleChange2}>En</h5>
			</div>
		</nav>
		</>
	);
};

export default Navbt;