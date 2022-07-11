import type { NextPage } from 'next';
{/* import styles from '../styles/Home.module.css'; */}
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
	const { data, error, isLoading } = trpc.useQuery([ 'hello' ]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>{JSON.stringify(error)}</div>;
	}

	return <div>{JSON.stringify(data)}</div>;
};

export default Home;
