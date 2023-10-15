import { atom } from 'recoil';

export const UserInterestTopic = atom({
  key: 'UserInterestTopic',
  default: {
    member_id: 1,
    interests: [],
  },
});
