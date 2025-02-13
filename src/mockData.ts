export const mockUsers = [
    {
      userId: 1,
      uuid: 'cf2e7b90-1fbb-4eb6-9d5f-727418ea95ec',
      name: 'Alice',
      authProvider: 'google',
    },
    {
      userId: 2,
      uuid: 'a6c13325-0d2d-4456-a450-d228e08a1070',
      name: 'Bob',
      authProvider: 'google',
    },
    {
      userId: 3,
      uuid: '65dc8ff8-bafe-4bba-8536-364fbdb5bdb3',
      name: 'Charlie',
      authProvider: 'discord',
    },
  ];

  export const mockParties = [
    {
      id: 1,
      name: 'Alice and Bob',
      created: '2025-02-01T10:00:00.000Z',
      started: false,
      ended: false,
      userIds: [1, 2], 
      roomCode: 12345,
      maxPlayers: 2,
      get isFull() {
        return this.userIds.length >= this.maxPlayers;
      }
    },
    {
      id: 2,
      name: 'Charlie',
      created: '2025-02-02T12:30:00.000Z',
      started: false,
      ended: false,
      userIds: [3], 
      roomCode: 67890, 
      maxPlayers: 2,  
      get isFull() {
        return this.userIds.length >= this.maxPlayers;
      }
    },
  ];

  export const mockTurns = [
    {
      turnId: 1,
      partyId: 1,
      playerId: 1,
      transcribedSpeech: 'Hello from Alice!',
    },
    {
      turnId: 2,
      partyId: 1,
      playerId: 2,
      transcribedSpeech: 'Hi Alice, this is Bob.',
    },
    {
      turnId: 3,
      partyId: 2,
      playerId: 2,
      transcribedSpeech: 'Bob speaking in Party #2.',
    },
    {
      turnId: 4,
      partyId: 2,
      playerId: 3,
      transcribedSpeech: 'Charlie responding in Party #2.',
    },
  ];
  

  export const mockReports = [
    {
      reportId: 1,
      partyId: 1,
      winnerUserId: 2,
      playerStats: [
        { userId: 1, rating: 75 }, 
        { userId: 2, rating: 88 }, 
      ],
    },
    {
      reportId: 2,
      partyId: 2,
      winnerUserId: 3,
      playerStats: [
        { userId: 2, rating: 80 }, 
        { userId: 3, rating: 90 }, 
      ],
    },
  ];