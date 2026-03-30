import { fetchAPI } from '../lib/api';

export const getUser = async () => {
  return fetchAPI('http://localhost:8081/trbtree-service/api/v1/private/users?page=0&size=10');
};