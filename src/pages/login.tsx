import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';
import { CreateUserInput } from '../schema/user.schema';
import { trpc } from '../utils/trpc';

function LoginPage() {
	const { handleSubmit, register } = useForm<CreateUserInput>();
	const [ success, setSuccess ] = useState(false);
	const router = useRouter();

	const { mutate, error } = trpc.useMutation([ 'users.request-otp' ], {
		onSuccess: () => {
			setSuccess(true);
		},
	});

	function onSubmit(values: CreateUserInput) {
		{/* mutate({ ...values, redirect: router.asPath }); */}
    mutate(values);
	}

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				{error && error.message}

				{success && <p>Check your email</p>}
				<h1>Login</h1>

				<input
					type='email'
					placeholder='jane.doe@example.com'
					{...register('email')}
				/>
				<button>Login</button>
			</form>

			<Link href='/register'>Register</Link>
		</>
	);
}

export default LoginPage;
