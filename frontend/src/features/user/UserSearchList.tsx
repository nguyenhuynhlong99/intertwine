import { UserSearch } from './SearchUser';
import UserSearchCard from './UserSearchCard';

interface Props {
  users: UserSearch[];
}

export default function UserSearchList({ users }: Props) {
  return (
    <ul>
      {users?.map((user) => (
        <UserSearchCard key={`search-follow-${user._id}`} user={user} />
      ))}
    </ul>
  );
}
