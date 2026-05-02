import { fetchAPI } from '../lib/api';
import { User, UserList } from '../types/auth.types';
  

export const getUser = async (): Promise<UserList> => {
  return fetchAPI('http://localhost:8081/trbtree-service/api/v1/private/users?page=0&size=10');
};

export const getUserById = async (id: string): Promise<User> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/users/${id}`);
};

export const getUserProfileById = async (id: string): Promise<any> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/profiles/${id}`);
};