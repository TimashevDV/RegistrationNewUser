import { useState, useRef } from 'react';
import styles from './app.module.css';

const sendFormData = (formData) => {
	console.log(formData);
};

export const App = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [doublePassword, setDoublePassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [doublePasswordError, setDoublePasswordError] =
		useState(null);

	const submitButtonRef = useRef(null);

	const onEmailChange = ({ target }) => {
		setEmail(target.value);
		let newErrorEmail = null;
		if (target.value.length > 40) {
			newErrorEmail =
				'Неверный Email. Допустимое количество символов, не более 40.';
		}

		setEmailError(newErrorEmail);
	};

	const onEmailBlur = () => {
		if (email.length < 3) {
			setEmailError(
				'Неверный Email. Должно быть не менее 3 символов.',
			);
		}
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);
		let newErrorPassword = null;
		if (!/^[\w]*$/.test(target.value)) {
			newErrorPassword =
				'Неверный пароль. Допустимые символы: английские буквы, цифры.';
		}

		setPasswordError(newErrorPassword);
	};

	const onDoublePasswordChange = ({ target }) => {
		setDoublePassword(target.value);
		let newErrorDoublePassword = null;
		if (!/^[\w]*$/.test(target.value)) {
			newErrorDoublePassword =
				'Неверный пароль. Допустимые символы: английские буквы, цифры.';
		}

		if (target.value === password) {
			submitButtonRef.current.focus();
		}
		setDoublePasswordError(newErrorDoublePassword);
	};

	const onDoublePasswordBlur = () => {
		if (password !== doublePassword) {
			setDoublePasswordError(
				'Повторный логин введен неверно.',
			);
		}
	};

	const onSubmit = (event) => {
		event.preventDefault();
		sendFormData({ email, password });
	};

	return (
		<div className={styles.app}>
			Регистрация нового пользователя
			<form onSubmit={onSubmit}>
				<div className={styles.text}>
					Введите Email
					<input
						name="email"
						type="email"
						value={email}
						onChange={onEmailChange}
						onBlur={onEmailBlur}
					/>
					{emailError && (
						<div className={styles.errorText}>
							{emailError}
						</div>
					)}
				</div>
				<div className={styles.text}>
					Введите пароль
					<input
						name="password"
						type="password"
						value={password}
						onChange={onPasswordChange}
					/>
					{passwordError && (
						<div className={styles.errorText}>
							{passwordError}
						</div>
					)}
				</div>
				<div className={styles.text}>
					Введите повторно пароль
					<input
						name="doublePassword"
						type="password"
						value={doublePassword}
						onChange={onDoublePasswordChange}
						onBlur={onDoublePasswordBlur}
					/>
					{doublePasswordError && (
						<div className={styles.errorText}>
							{doublePasswordError}
						</div>
					)}
				</div>
				<button
					ref={submitButtonRef}
					type="submit"
					disabled={
						!!emailError ||
						!!passwordError ||
						!!doublePasswordError ||
						!!!email ||
						!!!password ||
						!!!doublePassword
					}
				>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
};
