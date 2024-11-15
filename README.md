<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=5C5470&height=300&section=header&text=SOLUMON&fontColor=FAF0E6&fontSize=90" />
  <hr />
  👩‍⚖️SOLUMON(솔루몬)은 Solution + Solomon 을 합친 단어로 '솔로몬 처럼 지혜롭게 문제를 해결하다' 라는 의미입니다.<br/>
  사소한 일 부터 중요한 일 까지 결정을 내리기 어려울 때,<br/>
  다른 사람들과 의견을 나누며 더 나은 결정을 하도록 돕기 위해 개발했습니다.
</div>

<br/>

 ## 목차
 - 프로젝트 소개
 - 팀원 구성
 - 역할 분담
 - 사용한 기술과 라이브러리

<br/>

## 프로젝트 소개
- 사이트: https://solumon-frontend.vercel.app
- 피그마: https://www.figma.com/design/87Tu6FGR88I7CkBsa828kU/%5Bzerobase%5D%EC%86%94%EB%A3%A8%EB%AA%AC?node-id=0-1&t=p4tLeZQbqyIUO7K6-1
- 솔루몬은 인생에 영향을 미치는 중요한 결정에 어려움을 느끼거나 '오늘 뭐 먹지?' 처럼 사소한 결정도 쉽게 하지 못하는 분들을 위해 만들어진 커뮤니티 입니다.
- 사용자는 자신의 고민을 글로 작성하고 투표와 댓글을 통해 다른 사람들의 의견을 참고할 수 있습니다.
- 제목이나 태그 검색을 통하여 고민중인 사항과 비슷한 글을 찾아볼 수 있습니다.
- 관심있는 주제를 선택하면 그와 관련된 글들을 별도로 확인할 수 있습니다.

<br/>

## 팀원 구성 및 역할 분담
<h4>🌻 [@chaeeunj](https://github.com/chaeeunj)</h4>
  - 공통 컴포넌트
  <ul>
    <li>페이지네이션, 네비게이션 바, 게시글 카드, 정렬 탭, 모달창</li>
  </ul>
  - 페이지
  <ul>
    <li>로그인, 이메일 회원가입, 카카오 로그인, 회원정보 조회/수정, 비밀번호 찾기, 회원 탈퇴, 알림 조회, 내가 남긴 기록, 관심주제 선택, 전체 게시판, 상세 게시판, 검색, 검색 결과</li>
  </ul>
<h4>🌼 [@eunsoo-cho](https://github.com/eunsoo-cho)</h4>
  - 공통 컴포넌트
  <ul>
    <li>버튼, 채팅 카드, 탭 바, 텍스트 버튼, 게시글 작성 폼</li>
  </ul>
  - 페이지
  <ul>
    <li>시작, 게시글 작성, 게시글 상세 조회, 게시글 수정, 사용자 신고</li>
  </ul>

  <br/>

  ## 사용한 기술과 라이브러리
  - React
    - 코드가 중복되는 부분이 많아 이를 컴포넌트화 하여 유지보수와 재사용성을 고려했습니다.
  - Styled-Component
    - props를 이용한 조건부 스타일링을 활용했습니다.
  - Recoil
    - 빠른 학습과 적용을 위해 useState와 사용 방식이 유사한 recoil을 사용했습니다.
  - Axios
    - 응답 데이터를 JSON으로 자동 변환하고 에러 핸들링이 쉽기 때문에 Axios를 사용했습니다.
  - React Router v6
    - 원하는 url 을 설정하여 컴포넌트와 연결하고 히스토리 기능을 사용했습니다.
   
  <br/> 

  ## 페이지 소개
  - 로그인
    ![로그인](https://github.com/chaeeunj/WaW-project/assets/72565344/5e282fc4-5e40-4b97-8967-68aaf33604e1)
    - 구글 계정이나 가입한 이메일로 로그인할 수 있습니다.
    - 비밀번호 찾기 / 이메일로 회원가입 버튼을 클릭하면 해당 페이지로 이동합니다.
   
    <br/>

  - 이메일 회원가입
    ![이메일 회원가입](https://github.com/chaeeunj/WaW-project/assets/72565344/bd527d52-d289-47bb-878d-80db3613c157)
    - 사용자 정보를 입력하고 회원가입 버튼을 클릭하면 가입이 완료되고 전체 게시판 페이지로 이동합니다.

    <br/>
    
  - 전체 게시판
    ![전체 게시판 페이지](https://github.com/chaeeunj/WaW-project/assets/72565344/40bac27c-76b5-472e-aca1-215057fb4213)
    - 전체 게시글을 최신순, 채팅 참여순, 투표 참여순에 맞게 각각 5개씩 조회할 수 있습니다.
    - 전체보기 버튼을 클릭하면 각 주제(카테고리)별 게시판으로 이동합니다.
    - 선택한 관심주제에 해당하는 게시글을 별도로 조회할 수 있습니다.
    - 우측 검색 아이콘을 클릭하면 검색 페이지로 이동합니다.
    - 글쓰기 버튼을 클릭하면 게시글 작성 페이지로 이동합니다.
   
    <br/>

  - 주제(카테고리별) 게시판
    ![image](https://github.com/devcisive/solumon-frontend/assets/72565344/7b9bc317-61f4-40a4-b0b0-1b0e24c72147)
    - 전체 게시글을 최신순, 투표 참여순, 채팅 참여순, 마감 임박순으로 정렬할 수 있습니다.
    - 우측 검색 아이콘을 클릭하면 검색 페이지로 이동합니다.
    - 좌측 화살표 아이콘을 클릭하면 이전 페이지로 이동합니다.
   
      <br/>

  - 검색
    - 태그 검색
      ![검색 페이지_태그](https://github.com/devcisive/solumon-frontend/assets/72565344/5d141aa5-48ef-41cd-9050-a4db08aa98d7)
      - 해당 검색어를 태그한 게시글을 검색할 수 있습니다.
      - 전체보기 버튼을 클릭하면 모든 검색 결과를 조회할 수 있습니다.
     
        <br/>

    - 제목 검색
      ![검색 페이지_제목](https://github.com/devcisive/solumon-frontend/assets/72565344/80b7efaf-ae0f-47ee-a8a6-580a4a5ed4eb)
      - 해당 검색어를 제목에 포함한 게시글을 검색할 수 있습니다.
      - 전체보기 버튼을 클릭하면 모든 검색 결과를 조회할 수 있습니다.
     
        <br/>

  - 검색 결과
    ![image](https://github.com/devcisive/solumon-frontend/assets/72565344/56c39485-d3ae-4e8a-9a6c-5f3542f99f30)
    - 전체 검색 결과를 최신순, 투표 참여순, 채팅 참여순, 마감 임박순으로 정렬할 수 있습니다.
   
      <br/>

  - 게시글 조회
    - 투표 참여 전
      ![image](https://github.com/devcisive/solumon-frontend/assets/72565344/c857de31-222d-4f21-9a21-1aabd1093b67)
      - 원하는 투표 항목을 클릭하면 투표에 참여할 수 있습니다.(본인이 작성한 글 제외)
      - 댓글을 입력하여 게시글 작성자에게 직접 의견을 제시할 수 있습니다.
      - 다른 사용자들이 작성한 댓글에 답글로 의견을 표현할 수 있습니다.
      - 작성한 댓글을 수정하거나 삭제할 수 있습니다.
     
        <br/>
 
    - 투표 참여 후 또는 투표 종료 후 
      ![게시글 조회](https://github.com/devcisive/solumon-frontend/assets/72565344/67ca8e3d-e535-455f-8d3d-8751113ff478)
      - 투표에 참여하지 않아도 투표 기간이 종료되면 투표 결과와 항목별 득표 수를 확인할 수 있습니다.
      - 투표에 참여했다면 투표 기간 동안 현재 투표 현황을 알 수 있으며, 내가 투표한 항목이 무엇인지 알 수 있습니다.
     
        <br/>

  - 게시글 작성
    ![127 0 0 1_5173_post-write](https://github.com/devcisive/solumon-frontend/assets/72565344/52a18264-a6e2-4103-a9f6-4e493f3806f5)
    - 결정이 필요한 일에 관한 게시글을 작성할 수 있습니다.
    - 사진을 첨부하여 다른 사용자들에게 더 구체적인 내용을 공유할 수 있습니다.(필수X)
    - 직접 투표 기간과 투표 항목을 생성하여 다른 사용자들은 어떤 결정을 선호하는지 확인할 수 있습니다.
      - 투표 항목은 최소 2개 ~ 최대 5개까지 생성 가능합니다.
    - 게시글의 주제와 관련된 태그를 선택할 수 있습니다.(필수X)
   
     <br/>  

  - 회원정보 조회 / 수정
    ![회원정보](https://github.com/devcisive/solumon-frontend/assets/72565344/a7bba29e-73d7-466a-aa70-02275f12ae05)
    - 사용자의 가입 정보를 조회하고 수정할 수 있습니다.
    - 관심주제 input 창을 클릭하면 관심주제를 선택할 수 있는 페이지로 이동합니다.
      - 관심주제를 선택하거나 이전에 선택했던 관심주제를 변경할 수 있습니다.
    - 저장 버튼을 클릭해야 수정한 정보를 성공적으로 저장할 수 있습니다.
   
      <br/>

  - 내가 남긴 기록
    ![내가 남긴 기록](https://github.com/devcisive/solumon-frontend/assets/72565344/f0177bfe-32ff-4654-82c9-8f202bc143e4)
    - 사용자가 작성한 글, 투표에 참여한 글, 채팅에 참여한 글을 각각의 탭을 클릭하여 확인할 수 있습니다.
   
      <br/>

  - 회원탈퇴
    ![회원탈퇴](https://github.com/devcisive/solumon-frontend/assets/72565344/e670169a-fa05-41ea-8d9a-7c787086cbf5)
    - 사용자의 이메일과 비밀번호를 입력하여 일치했을 때만 회원 탈퇴가 가능합니다.
   
      <br/>
