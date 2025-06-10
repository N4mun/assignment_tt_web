import { useState, useCallback } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import type { User } from '../services/userService';

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([]);

    const fetchUsers = useCallback(async () => {
        const data = await getUsers();
        setUsers(data);
    }, []);

    const addUser = async (user: User) => {
        await createUser(user);
        await fetchUsers();
    };

    const editUser = async (user: User) => {
        await updateUser(user);
        await fetchUsers();
    };

    const removeUser = async (user_id: number) => {
        await deleteUser(user_id);
        await fetchUsers();
    };

    return { users, fetchUsers, addUser, editUser, removeUser };
}