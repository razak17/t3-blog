import Link from 'next/link';
import { trpc } from '../../utils/trpc';

function PostListingPage() {
	const { data, isLoading } = trpc.useQuery(['posts.posts']);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<Link href='/'>Home</Link>
			<Link href='/posts'>Posts</Link>
			{data?.map(post => {
				return (
					<article key={post.id}>
						<p>{post.title}</p>
						<Link href={`/posts/${post.id}`}>Read post</Link>
					</article>
				);
			})}
		</div>
	);
}

export default PostListingPage;
