import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { User } from "../../../types/types";
import { SearchBox } from "../SearchBox/SearchBox";
import { UserList } from "../UserList/UserList";

type EntityListProps = {
  title: string;
  fetchEntities: () => Promise<any[]>;
  transformEntity: (entity: any) => User;
  icon: React.ReactElement;
  onSelect?: (user: User) => void;
};

export const EntityList: React.FC<EntityListProps> = ({
  title,
  fetchEntities,
  transformEntity,
  icon,
  onSelect,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const entities = await fetchEntities();
      const transformedUsers = entities.map(transformEntity);
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
    };

    fetchUsers();
  }, [fetchEntities, transformEntity]);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <Box display="flex" justifyContent="center" mt={10}>
      <Box maxWidth={"90%"} width={400}>
        <Typography mb={4} variant="h4" align="center">
          {title}
        </Typography>
        <SearchBox onChange={(search) => setSearchTerm(search)} />
        <Box mb={4}>
          <UserList
            users={filteredUsers}
            icon={icon}
            onSelect={(user: User) => {
              onSelect?.(user);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
