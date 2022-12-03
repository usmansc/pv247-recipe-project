export type FieldValidator = (value: string) => string | undefined;

export const requiredValidator: FieldValidator = value =>
	value ? undefined : 'Required';

export const emailValidator: FieldValidator = value =>
	/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
		? undefined
		: 'Invalid email address';

export const passwordValidator: FieldValidator = value =>
	value.length >= 8 ? undefined : 'Password must be at least 8 characters';
