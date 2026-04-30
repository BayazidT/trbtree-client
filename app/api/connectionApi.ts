import { fetchAPI } from '../lib/api';

export const getConnection = async (id: String) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/connection/receive/${id}`);
};