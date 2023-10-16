import { atom } from 'recoil';

export const UserInterestTopic = atom({
  key: 'UserInterestTopic',
  default: {
    member_id: 1,
    interests: ['연애', '드라마/영화', '다이어트'],
  },
});
