import { api } from './api';

export type User = {
    user_id?: number;
    user_firstname: string;
    user_lastname: string;
    user_phone: string;
    user_email: string;
};

type UserResponse = {
    status: number;
    message: string;
    data: User[];
};

export const getUsers = async (): Promise<User[]> => {
    const res = await api.get<UserResponse>('/users');
    return res.data.data;
};

export const createUser = async (user: User) => {
    const res = await api.post('/users/create', user);
    return res.data;
};

export const updateUser = async (user: User) => {
    const res = await api.put<UserResponse>('/users/update', user);
    return { status: res.data.status, message: res.data.message };
};

export const deleteUser = async (user_id: number) => {
    const res = await api.delete<UserResponse>(`/users/delete/${user_id}`);
    return { status: res.data.status, message: res.data.message };
};
