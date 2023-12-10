import "./UserList.scss";
import { UserItem } from "./UserItem/UserItem";
import { User } from "../../../types/types";

interface UserListProps {
  users: User[];
  icon?: React.ReactNode;
  onSelect?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({
  users,
  icon,
  onSelect,
}) => {
  return (
    <>
      {users.map((user: User) => {
        return (
          <UserItem
            name={user.name}
            key={user.id}
            icon={icon}
            onSelect={() => {
              onSelect?.(user);
            }}
          />
        );
      })}
    </>
  );
};
