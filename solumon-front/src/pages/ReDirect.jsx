import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { GeneralUserInfo } from '../recoil/AllAtom';

import Loading from '../components/Loading';

function ReDirect() {
  let code = new URL(window.location.href).searchParams.get('code');

  const [generalUserInfo, setGeneralUserInfo] = useRecoilState(GeneralUserInfo);
  const navigate = useNavigate();

  // url 꼬다리 ?code=${code}

  // 카카오 로그인 진행 후 발급받은 인가코드로 백엔드에 카카오 액세스 토큰 요청
  const getKakaoAccessToken = async () => {
    try {
      const response = await axios.get(
        `http://solumon.site:8080/user/start/kakao?code=${code}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status === 200) {
        const json = response.data;
        console.log(json);
        window.localStorage.setItem('kakaoToken', json.kakao_access_token);
        json.is_member ? getKakaoLoginToken() : navigate('/user/sign-up/kakao');
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // getKakaoAccessToken 함수 응답의 is_member 값이 true일 때
  // 발급받은 카카오 로그인 액세스 토큰으로 로그인 요청 후 사이트 액세스 토큰 발급받는 함수
  const getKakaoLoginToken = async () => {
    const KAKAO_TOKEN = window.localStorage.getItem('kakaoToken');
    try {
      const response = await axios.post(
        'http://solumon.site:8080/user/sign-in/kakao',
        { kakao_access_token: KAKAO_TOKEN },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );

      if (response.status === 200) {
        const json = response.data;
        console.log(json);
        window.localStorage.setItem(
          'userInfo',
          JSON.stringify({
            accessToken: json.access_token,
            firstLogIn: json.is_first_log_in,
            memberId: json.member_id,
            nickname: json.nickname,
          }),
        );
        navigate('/post-list');
      } else {
        console.error('로그인 실패');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    getKakaoAccessToken();
  }, []);

  return <Loading />;
}

export default ReDirect;
