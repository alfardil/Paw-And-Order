export interface User {
    uuid: string;
    joinedAt: string; 
    googleId?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    authProvider?: string;
    Party?: Party[]; 
    sessions?: Session[];
    reports?: Report[];
    feedbacks?: Feedback[];
  }
  
  export interface Session {
    id: string;
    userId: string;
    expiresAt: string; 
    deletedAt?: string; 
    user?: User;
  }
  
  export interface Party {
    id: string;
    name: string;
    prompt: string;
    createdAt: string; 
    roomCode: string;
    maxPlayers: number;
    started: boolean;
    ended: boolean;
    isFull: boolean;
    users?: User[];
    reports?: Report[];
    feedbacks?: Feedback[];
  }
  
  export interface Report {
    id: string;
    createdAt: string;
    message: string;
    userUuid: string;
    partyId: string;
    user?: User;
    party?: Party;
  }
  
  export interface Feedback {
    id: string;
    createdAt: string; 
    content: string;
    partyId: string;
    userUuid: string;
    party?: Party;
    user?: User;
  }
  
  export interface ValidationResponse {
    success: boolean;
    message: string;
    data?: {
      user?: User;
      session?: Session;
    };
  }