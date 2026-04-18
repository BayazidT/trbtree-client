import { fetchAPI } from '../lib/api';

export const getResumeUserById = async (id: string) => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/resume/${id}`);
};
