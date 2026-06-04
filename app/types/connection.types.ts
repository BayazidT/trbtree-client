export interface Connection {
  id: String;
  addresseeId: String;
  addresseeName: String;
  requesterName: String;
  requesterId: String;
  status: String;
  createdAt: String;
}

export interface ConnectionResponseList {
    connections:Connection[];
}
export interface ConnectionStatus {
  status: String;
}

export interface ConnectionRequest{
  addresseeId: String
}