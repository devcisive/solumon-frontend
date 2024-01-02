import { atom } from 'recoil';

export const kakaoToken = atom({
  key: 'kakaoToken',
  default: '',
});

export const GeneralUserInfo = atom({
  key: 'GeneralUserInfo',
  default: [
    {
      accessToken: '',
      firstLogIn: false,
      memberId: 0,
      nickname: '',
      interests: [],
    },
  ],
});

export const SearchKeyword = atom({
  key: 'SearchKeyword',
  default: '',
});

export const HashTagChoice = atom({
  key: 'HashTagChoice',
  default: {},
});
