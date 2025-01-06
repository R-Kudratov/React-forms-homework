import styles from './registration.module.css'
import propTypes from 'prop-types'

const RegistrationLayout = ({ error }) => {
	return (
		<div className={styles.registration}>
			{error && <p className={styles.errorMessage}>{error}</p>}
			<input type="email" placeholder="email" />
			<input type="password" placeholder="пароль" />
			<input type="password" placeholder="повторите пароль" />
			<button>Зарегистрироваться</button>
		</div>
	)
}

RegistrationLayout.propTypes = {
	error: propTypes.string,
}

export const Registration = () => {
	let error = null
	return <RegistrationLayout error={error} />
}
