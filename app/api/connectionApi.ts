import { fetchAPI } from '../lib/api';
import { Connection, ConnectionResponseList, ConnectionStatus } from '../types/connection.types';

export const getConnection = async(id: String): Promise<ConnectionResponseList> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/connection/receive/${id}`);
};

export const updateConnectionStatus = async (
  id: String,
  connectionStatus: ConnectionStatus
): Promise<ConnectionResponseList> => {
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/connection/${id}`, {
      method: "PUT",
      body: { status: connectionStatus.status }
    });
};

export const sendConnectionRequest = async(id: String, addresseeId: String) =>{
  return fetchAPI(`http://localhost:8081/trbtree-service/api/v1/private/connection/${id}`, {
    method: "POST",
    body: {addresseeId: addresseeId}
  })

}