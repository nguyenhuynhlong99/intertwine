import { Link } from 'react-router-dom';
import { UserSearch } from './SearchUser';
import UserSearchCard from './UserSearchCard';

interface Props {
  users: UserSearch[];
}

export default function UserSearchList({ users }: Props) {
  return (
    <ul>
      {users?.map((user) => (
        <Link key={`search-follow-${user._id}`} to={`/${user?.username}`}>
          <UserSearchCard user={user} />
        </Link>
      ))}
    </ul>
  );
}
