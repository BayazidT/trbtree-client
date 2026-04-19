import { fetchAPI } from '../lib/api';

export const getBioDataUserById = async (id: string) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/bio-data/${id}`);
};
