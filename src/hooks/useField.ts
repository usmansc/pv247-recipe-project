import { ChangeEvent, useCallback, useMemo, useState } from 'react';

import { FieldValidator } from '../utils/validation';

const useField = (id: string, ...validators: FieldValidator[]) => {
	const [value, setValue] = useState('');
	const [touched, setTouched] = useState(false);

	const onChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			setValue(e.target.value);
		},
		[setValue]
	);
	const error = useMemo(
		() =>
			(validators ?? []).reduce(
				(error: string | undefined, validator: FieldValidator) =>
					error ? error : validator(value),
				undefined
			),
		[value]
	);
	return [
		// Current value for convenient access
		value,
		// Props for the TextField
		{
			id,
			value,
			onChange,
			onBlur: useCallback(() => setTouched(true), []),
			error: touched && !!error,
			helperText: touched && error ? error : undefined
		},
		setValue
	] as const;
};

export default useField;
