import { fetchAPI } from '../lib/api';

export const getUser = async () => {
  return fetchAPI('https://trbtree.com/api/v1/private/user');
};