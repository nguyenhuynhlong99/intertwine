import useDocumentTitle from '../hooks/useDocumentTitle';
import SearchUser from '../features/user/SearchUser';

export default function SearchPage() {
  useDocumentTitle('Search • Intertwine');

  return (
    <>
      <SearchUser />
    </>
  );
}
