export interface Connection {
  id: String;
  addresseId: String;
  AddressName: String;
  requesterName: String;
  requesterId: String;
  status: String;
  createdAt: String;
}

export interface ConnectionList {
    connectionList:Connection[];
}