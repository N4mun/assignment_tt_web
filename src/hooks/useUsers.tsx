import { useState, useCallback } from "react";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import type { User } from '../services/userService';

export default function useUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getUsers();
            setUsers(data);
        } finally {
            setLoading(false);
        }
    }, []);

    const addUser = async (user: User) => {
        setLoading(true);
        try {
            await createUser(user);
            await fetchUsers();
        } finally {
            setLoading(false);
        }
    };

    const editUser = async (user: User) => {
        setLoading(true);
        try {
            await updateUser(user);
            await fetchUsers();
        } finally {
            setLoading(false);
        }
    };

    const removeUser = async (user_id: number) => {
        setLoading(true);
        try {
            await deleteUser(user_id);
            await fetchUsers();
        } finally {
            setLoading(false);
        }
    };

    return { users, loading, fetchUsers, addUser, editUser, removeUser };
}