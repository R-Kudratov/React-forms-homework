import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import styles from './registration.module.css'

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required('Введите email')
		.matches(
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			'Введен некорректный email',
		),
	password: yup
		.string()
		.required('Введите пароль')
		.min(8, 'Пароль должен содержать минимум 8 символов')
		.matches(
			/[A-Z]/,
			'Пароль должен содержать хотя бы одну заглавную букву',
		)
		.matches(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
		.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
	passwordConfirmation: yup
		.string()
		.required('Подтвердите пароль')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
})

const RegistrationLayout = ({
	register,
	errors,
	onSubmit,
	submitButtonRef,
}) => {
	return (
		<form className={styles.registration} onSubmit={onSubmit}>
			{errors && <p className={styles.error}>{errors}</p>}
			<input type="email" placeholder="email" {...register('email')} />
			<input
				type="password"
				placeholder="пароль"
				{...register('password')}
			/>
			<input
				type="password"
				placeholder="подтвердите пароль"
				{...register('passwordConfirmation')}
			/>
			<button type="submit" ref={submitButtonRef} disabled={!!errors}>
				Зарегистрироваться
			</button>
		</form>
	)
}

export const Registration = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		reset,
	} = useForm({
		mode: 'onBlur',
		defaultValues: { email: '', password: '', passwordConfirmation: '' },
		resolver: yupResolver(validationSchema),
	})

	const getErrorsText = () => {
		const errorsText = [
			errors.email?.message,
			errors.password?.message,
			errors.passwordConfirmation?.message,
		]
		return errorsText.filter(Boolean).join('\n')
	}

	const submitButtonRef = useRef(null)

	useEffect(() => {
		if (isValid) {
			submitButtonRef.current.disabled = false
			submitButtonRef.current.focus()
		}
	}, [isValid])

	const onSubmit = (data) => {
		console.log(data)
		reset()
	}

	return (
		<RegistrationLayout
			register={register}
			errors={getErrorsText()}
			onSubmit={handleSubmit(onSubmit)}
			submitButtonRef={submitButtonRef}
		/>
	)
}
