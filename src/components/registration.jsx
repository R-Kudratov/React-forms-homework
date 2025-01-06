import { useRef, useState } from 'react'
import propTypes from 'prop-types'
import styles from './registration.module.css'

const RegistrationLayout = ({
	validateEmail,
	validatePassword,
	validatePasswordConfirmation,
	onSubmit,
	submitButtonRef,
	displayErrors,
}) => {
	return (
		<form className={styles.registration} onSubmit={onSubmit}>
			{displayErrors && <p className={styles.error}>{displayErrors}</p>}
			<input
				type="email"
				placeholder="email"
				onBlur={({ target }) => {
					validateEmail(target.value)
				}}
			/>
			<input
				type="password"
				placeholder="пароль"
				onBlur={({ target }) => validatePassword(target.value)}
			/>
			<input
				type="password"
				placeholder="подтвердите пароль"
				onChange={({ target }) => {
					validatePasswordConfirmation(target.value)
				}}
			/>
			<button
				type="submit"
				ref={submitButtonRef}
				disabled={displayErrors}
			>
				Зарегистрироваться
			</button>
		</form>
	)
}

RegistrationLayout.propTypes = {
	displayErrors: propTypes.string,
	validateEmail: propTypes.func.isRequired,
	validatePassword: propTypes.func.isRequired,
	onSubmit: propTypes.func.isRequired,
	validatePasswordConfirmation: propTypes.func.isRequired,
	submitButtonRef: propTypes.object.isRequired,
}

export const Registration = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [errors, setErrors] = useState({})

	const submitButtonRef = useRef(null)

	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

	const validateEmail = (email) => {
		const newError = { ...errors, email: null }

		if (!email) {
			newError.email = 'Введите email'
		} else if (!emailRegex.test(email)) {
			newError.email = 'Введен некорректный email'
		} else {
			newError.email = null
			setEmail(email)
		}

		setErrors(newError)
	}

	const validatePassword = (password) => {
		const newError = { ...errors, password: null }

		if (!password) {
			newError.password = 'Введите пароль'
		} else if (!passwordRegex.test(password)) {
			newError.password =
				'Пароль должен содержать минимум 8 символов, хотя бы одну заглавную букву, одну строчную букву и одну цифру'
		} else {
			newError.password = null
			setPassword(password)
		}

		setErrors(newError)
	}

	const validatePasswordConfirmation = (repeatedPassword) => {
		const newError = { ...errors, repeatedPassword: null }

		if (!repeatedPassword) {
			newError.repeatedPassword = 'Подтвердите пароль'
		} else if (repeatedPassword !== password) {
			newError.repeatedPassword = 'Пароли не совпадают'
		} else if (repeatedPassword === password) {
			setPasswordConfirmation(repeatedPassword)
			newError.repeatedPassword = null
			submitButtonRef.current.disabled = false
			submitButtonRef.current.focus()
		}

		setErrors(newError)
	}

	const displayErrors = () => {
		return Object.values(errors).filter(Boolean).join('\n')
	}

	const validateForm = () => {
		const newErrors = {}

		if (!email) newErrors.email = 'Введите email'
		if (!password) newErrors.password = 'Введите пароль'
		if (!passwordConfirmation)
			newErrors.repeatedPassword = 'Подтвердите пароль'

		setErrors(newErrors)

		return Object.keys(newErrors).length === 0
	}

	const onSubmit = (event) => {
		event.preventDefault()

		if (validateForm()) {
			console.log(email, password)
			event.target.reset()
			setEmail('')
			setPassword('')
			setPasswordConfirmation('')
			setErrors({})
		}
	}

	return (
		<RegistrationLayout
			validateEmail={validateEmail}
			validatePassword={validatePassword}
			validatePasswordConfirmation={validatePasswordConfirmation}
			onSubmit={onSubmit}
			submitButtonRef={submitButtonRef}
			displayErrors={displayErrors()}
		/>
	)
}
