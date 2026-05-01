import { fetchAPI } from '../lib/api';
import { Connection, ConnectionResponseList } from '../types/connection.types';

export const getConnection = async(id: String): Promise<ConnectionResponseList> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/connection/receive/${id}`);
};