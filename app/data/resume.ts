import { fetchAPI } from '../lib/api';
import { User } from '../types/auth.types';
import { ResumeData } from '../types/resume.types';

export const getResumeUserById = async (id: string):Promise<ResumeData> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/resume/${id}`);
};
