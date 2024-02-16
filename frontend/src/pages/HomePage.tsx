import FeedPosts from '../features/posts/FeedPosts';
import useDocumentTitle from '../hooks/useDocumentTitle';

export default function HomePage() {
  useDocumentTitle('Intertwine');

  return (
    <>
      <FeedPosts />
    </>
  );
}
