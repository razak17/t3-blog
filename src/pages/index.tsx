import type { NextPage } from 'next';
import Link from 'next/link';
import LoginForm from '../components/LoginForm';
import { useUserContext } from '../context/user.context';

const Home: NextPage = () => {
	const user = useUserContext();

	if (!user) {
		return <LoginForm />;
	}

	return (
		<div>
			<Link href='/posts/new'>Create post</Link>
      <Link href='/posts'>Posts</Link>
		</div>
	);
};

export default Home;
