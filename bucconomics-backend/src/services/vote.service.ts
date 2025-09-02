export const castVote = async (voteData: any) => {
  // Replace with real DB logic
  return {
    ...voteData,
    id: Math.random().toString(36).substr(2, 9),
    castAt: new Date(),
  };
};

export const getVotes = async () => {
  // Dummy data - replace with real DB fetch
  return [
    {
      id: "vote123",
      userId: "user1",
      option: "yes",
    },
  ];
};
