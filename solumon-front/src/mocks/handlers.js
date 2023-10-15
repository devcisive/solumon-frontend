// src/mocks/handlers.js
import { rest } from 'msw';

// 사용자 데이터를 저장할 상태 변수
let users = [
  {
    member_id: 1,
    nickname: 'user1',
    email: 'user1@example.com',
  },
  {
    member_id: 2,
    nickname: 'user2',
    email: 'user2@example.com',
  },
  // 추가 사용자 데이터를 필요한 만큼 추가하세요.
];

let userInterest = [
  {
    member_id: 1,
    interests: ['취업', '뷰티', '연애'],
  },
  {
    member_id: 2,
    interests: ['패션', '음악'],
  },
  {
    member_id: 3,
    interests: ['드라마/영화', '자취', '음식', '다이어트', '독서'],
  },
];

export const handlers = [
  // PostLists 페이지 - 아직 고민중인 고민들, 채팅 참여 많은, 투표 참여 많은
  rest.get(
    'https://jsonplaceholder.typicode.com/posts',
    async (req, res, ctx) => {
      const postType = req.url.searchParams.get('postType');
      const postStatus = req.url.searchParams.get('postStatus');
      const postOrder = req.url.searchParams.get('postOrder');
      const page = req.url.searchParams.get('currentPage');

      if (postType === 'general' && postStatus === 'ongoing' && page >= 0) {
        // 적절한 응답을 생성합니다.
        return res(
          ctx.json([
            {
              writer: postOrder,
              post_id: 1,
              created_at: '2023-09-25',
              chat_count: 13,
              vote_count: 20,
              image_url: 'https://via.placeholder.com/600/92c952',
              title:
                'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
              preview:
                'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            },
            {
              writer: postOrder,
              post_id: 2,
              created_at: '2023-09-22',
              chat_count: 3,
              vote_count: 13,
              image_url: 'https://via.placeholder.com/600/771796',
              title: 'qui est esse',
              preview:
                'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
            },
            {
              writer: postOrder,
              post_id: 3,
              created_at: '2023-09-23',
              chat_count: 10,
              vote_count: 22,
              image_url: 'https://via.placeholder.com/600/24f355',
              title:
                'ea molestias quasi exercitationem repellat qui ipsa sit aut',
              preview:
                'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
            },
            {
              writer: postOrder,
              post_id: 4,
              created_at: '2023-09-09',
              chat_count: 12,
              vote_count: 14,
              image_url: 'https://via.placeholder.com/600/d32776',
              title: 'eum et est occaecati',
              preview:
                'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            },
            {
              writer: postOrder,
              post_id: 5,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/f66b97',
              title: 'nesciunt quas odio',
              preview:
                'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
            },
            {
              writer: postOrder,
              post_id: 6,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/56a8c2',
              title: 'dolorem eum magni eos aperiam quia',
              preview:
                'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
            },
            {
              writer: postOrder,
              post_id: 7,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/b0f7cc',
              title: 'magnam facilis autem',
              preview:
                'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
            },
            {
              writer: postOrder,
              post_id: 8,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/54176f',
              title: 'dolorem dolore est ipsam',
              preview:
                'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
            },
            {
              writer: postOrder,
              post_id: 9,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/51aa97',
              title: 'nesciunt iure omnis dolorem tempora et accusantium',
              preview:
                'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
            },
            {
              writer: postOrder,
              post_id: 10,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/810b14',
              title: 'optio molestias id quia eum',
              preview:
                'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
            },
            {
              writer: postOrder,
              post_id: 11,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/1ee8a4',
              title: 'et ea vero quia laudantium autem',
              preview:
                'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
            },
            {
              writer: postOrder,
              post_id: 12,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/66b7d2',
              title: 'in quibusdam tempore odit est dolorem',
              preview:
                'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
            },
            {
              writer: postOrder,
              post_id: 13,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/197d29',
              title: 'dolorum ut in voluptas mollitia et saepe quo animi',
              preview:
                'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
            },
            {
              writer: postOrder,
              post_id: 14,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/61a65',
              title: 'voluptatem eligendi optio',
              preview:
                'fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum',
            },
            {
              writer: postOrder,
              post_id: 15,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/f9cee5',
              title: 'eveniet quod temporibus',
              preview:
                'reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae',
            },
            {
              writer: postOrder,
              post_id: 16,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/fdf732',
              title:
                'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
              preview:
                'suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta',
            },
            {
              writer: postOrder,
              post_id: 17,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/9c184f',
              title: 'fugit voluptas sed molestias voluptatem provident',
              preview:
                'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo',
            },
            {
              writer: postOrder,
              post_id: 18,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/1fe46f',
              title: 'voluptate et itaque vero tempora molestiae',
              preview:
                'eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam',
            },
            {
              writer: postOrder,
              post_id: 19,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/56acb2',
              title: 'adipisci placeat illum aut reiciendis qui',
              preview:
                'illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas',
            },
            {
              writer: postOrder,
              post_id: 20,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/8985dc',
              title: 'doloribus ad provident suscipit at',
              preview:
                'qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo',
            },
          ]),
        );
      } else if (postStatus === 'completed') {
        return res(
          ctx.json([
            {
              writer: postStatus,
              post_id: 1,
              created_at: '2023-09-25',
              chat_count: 13,
              vote_count: 20,
              image_url: 'https://via.placeholder.com/600/92c952',
              title:
                'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
              preview:
                'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
            },
            {
              writer: postStatus,
              post_id: 2,
              created_at: '2023-09-22',
              chat_count: 3,
              vote_count: 13,
              image_url: 'https://via.placeholder.com/600/771796',
              title: 'qui est esse',
              preview:
                'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
            },
            {
              writer: postStatus,
              post_id: 3,
              created_at: '2023-09-23',
              chat_count: 10,
              vote_count: 22,
              image_url: 'https://via.placeholder.com/600/24f355',
              title:
                'ea molestias quasi exercitationem repellat qui ipsa sit aut',
              preview:
                'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
            },
            {
              writer: postStatus,
              post_id: 4,
              created_at: '2023-09-09',
              chat_count: 12,
              vote_count: 14,
              image_url: 'https://via.placeholder.com/600/d32776',
              title: 'eum et est occaecati',
              preview:
                'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
            },
            {
              writer: postStatus,
              post_id: 5,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/f66b97',
              title: 'nesciunt quas odio',
              preview:
                'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
            },
            {
              writer: postStatus,
              post_id: 6,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/56a8c2',
              title: 'dolorem eum magni eos aperiam quia',
              preview:
                'ut aspernatur corporis harum nihil quis provident sequi\nmollitia nobis aliquid molestiae\nperspiciatis et ea nemo ab reprehenderit accusantium quas\nvoluptate dolores velit et doloremque molestiae',
            },
            {
              writer: postStatus,
              post_id: 7,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/b0f7cc',
              title: 'magnam facilis autem',
              preview:
                'dolore placeat quibusdam ea quo vitae\nmagni quis enim qui quis quo nemo aut saepe\nquidem repellat excepturi ut quia\nsunt ut sequi eos ea sed quas',
            },
            {
              writer: postStatus,
              post_id: 8,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/54176f',
              title: 'dolorem dolore est ipsam',
              preview:
                'dignissimos aperiam dolorem qui eum\nfacilis quibusdam animi sint suscipit qui sint possimus cum\nquaerat magni maiores excepturi\nipsam ut commodi dolor voluptatum modi aut vitae',
            },
            {
              writer: postStatus,
              post_id: 9,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/51aa97',
              title: 'nesciunt iure omnis dolorem tempora et accusantium',
              preview:
                'consectetur animi nesciunt iure dolore\nenim quia ad\nveniam autem ut quam aut nobis\net est aut quod aut provident voluptas autem voluptas',
            },
            {
              writer: postStatus,
              post_id: 10,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/810b14',
              title: 'optio molestias id quia eum',
              preview:
                'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error',
            },
            {
              writer: postStatus,
              post_id: 11,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/1ee8a4',
              title: 'et ea vero quia laudantium autem',
              preview:
                'delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus\naccusamus in eum beatae sit\nvel qui neque voluptates ut commodi qui incidunt\nut animi commodi',
            },
            {
              writer: postStatus,
              post_id: 12,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/66b7d2',
              title: 'in quibusdam tempore odit est dolorem',
              preview:
                'itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio',
            },
            {
              writer: postStatus,
              post_id: 13,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/197d29',
              title: 'dolorum ut in voluptas mollitia et saepe quo animi',
              preview:
                'aut dicta possimus sint mollitia voluptas commodi quo doloremque\niste corrupti reiciendis voluptatem eius rerum\nsit cumque quod eligendi laborum minima\nperferendis recusandae assumenda consectetur porro architecto ipsum ipsam',
            },
            {
              writer: postStatus,
              post_id: 14,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/61a65',
              title: 'voluptatem eligendi optio',
              preview:
                'fuga et accusamus dolorum perferendis illo voluptas\nnon doloremque neque facere\nad qui dolorum molestiae beatae\nsed aut voluptas totam sit illum',
            },
            {
              writer: postStatus,
              post_id: 15,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/f9cee5',
              title: 'eveniet quod temporibus',
              preview:
                'reprehenderit quos placeat\nvelit minima officia dolores impedit repudiandae molestiae nam\nvoluptas recusandae quis delectus\nofficiis harum fugiat vitae',
            },
            {
              writer: postStatus,
              post_id: 16,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/fdf732',
              title:
                'sint suscipit perspiciatis velit dolorum rerum ipsa laboriosam odio',
              preview:
                'suscipit nam nisi quo aperiam aut\nasperiores eos fugit maiores voluptatibus quia\nvoluptatem quis ullam qui in alias quia est\nconsequatur magni mollitia accusamus ea nisi voluptate dicta',
            },
            {
              writer: postStatus,
              post_id: 17,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/9c184f',
              title: 'fugit voluptas sed molestias voluptatem provident',
              preview:
                'eos voluptas et aut odit natus earum\naspernatur fuga molestiae ullam\ndeserunt ratione qui eos\nqui nihil ratione nemo velit ut aut id quo',
            },
            {
              writer: postStatus,
              post_id: 18,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/1fe46f',
              title: 'voluptate et itaque vero tempora molestiae',
              preview:
                'eveniet quo quis\nlaborum totam consequatur non dolor\nut et est repudiandae\nest voluptatem vel debitis et magnam',
            },
            {
              writer: postStatus,
              post_id: 19,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/56acb2',
              title: 'adipisci placeat illum aut reiciendis qui',
              preview:
                'illum quis cupiditate provident sit magnam\nea sed aut omnis\nveniam maiores ullam consequatur atque\nadipisci quo iste expedita sit quos voluptas',
            },
            {
              writer: postStatus,
              post_id: 20,
              created_at: '2023-09-24',
              chat_count: 7,
              vote_count: 19,
              image_url: 'https://via.placeholder.com/600/8985dc',
              title: 'doloribus ad provident suscipit at',
              preview:
                'qui consequuntur ducimus possimus quisquam amet similique\nsuscipit porro ipsam amet\neos veritatis officiis exercitationem vel fugit aut necessitatibus totam\nomnis rerum consequatur expedita quidem cumque explicabo',
            },
          ]),
        );
      }
    },
  ),

  // 은수님이 작성한 부분
  // rest.post(
  //   'https://jsonplaceholder.typicode.com/users',
  //   async (req, res, ctx) => {
  //     // 가상의 데이터
  //     let users = [
  //       { email: 'nick@example.com', passWord: '1234', id: 1 },
  //       { email: 'alice@example.com', passWord: '5678', id: 2 },
  //       { email: 'bob@example.com', passWord: 'abcd', id: 3 },
  //     ];
  //     // 클라이언트에서 전송된 정보에서 이메일과 비밀번호 추출
  //     const { email, passWord } = req.body;

  //     // 가상데이터에서 이메일과 비밀번호가 일치하는 사용자 찾기
  //     const matchedUser = users.find(
  //       (user) => user.email === email && user.passWord === passWord
  //     );

  //     if (matchedUser) {
  //       return res(
  //         ctx.status(200),
  //         ctx.json({
  //           member_id: 1,
  //           is_firstLogin: true, //첫번째 로그인 유무
  //           access_token: 'ACCESS_TOKEN',
  //           refresh_token: 'REFRECH_TOKEN',
  //         })
  //       );
  //     } else {
  //       return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
  //     }
  //   }
  // ),

  // 회원정보 페이지 기본 설정 값 가져오기
  rest.get(
    'https://jsonplaceholder.typicode.com/user',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            member_id: 1,
            nickname: 'test',
            email: 'test@naver.com',
            interests: ['뷰티', '드라마/영화', '연애'],
          },
        ]),
      );
    },
  ),

  // 회원정보 수정
  rest.put(
    'https://jsonplaceholder.typicode.com/user',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            member_id: 1,
            nickname: req.body.nickname,
            email: 'test@naver.com',
            password: req.body.password,
            new_password1: req.body.new_password1,
            new_password2: req.body.new_password2,
            interests: req.body.interests,
          },
        ]),
      );
    },
  ),

  // 회원탈퇴
  rest.delete(
    'https://jsonplaceholder.typicode.com/user/withdraw',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            password: req.body.password,
          },
        ]),
      );
    },
  ),

  // 회원가입 시 입력 정보 POST 요청 핸들러
  rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    // 새 사용자 데이터를 POST 요청으로 추가
    const newUser = {
      member_id: req.body.member_id,
      nickname: req.body.nickname,
      email: req.body.email,
      password: req.body.password,
    };
    users.push(newUser);

    return res(ctx.status(201), ctx.json(newUser));
  }),

  // 사용자 데이터 GET 요청 핸들러
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    // GET 요청을 가로채고 현재 사용자 데이터를 반환
    return res(ctx.status(200), ctx.json(users));
  }),

  // 사용자 관심주제 등록 POST 요청 핸들러
  rest.post(
    'https://jsonplaceholder.typicode.com/user/interests',
    (req, res, ctx) => {
      const newUserInterest = {
        member_id: req.body.member_id,
        interests: req.body.interests,
      };
      userInterest.push(newUserInterest);

      return res(ctx.status(201), ctx.json(newUserInterest));
    },
  ),

  // 관심주제 GET 요청 핸들러
  rest.get(
    'https://jsonplaceholder.typicode.com/user/interests',
    (req, res, ctx) => {
      // GET 요청을 가로채고 현재 사용자 관심 주제를 반환
      return res(ctx.status(200), ctx.json(userInterest));
    },
  ),

  // email 인증 버튼 클릭 시 post 요청
  rest.post(
    'https://jsonplaceholder.typicode.com/user/send-emailAuth',
    (req, res, ctx) => {
      const userEmailAuth = {
        email: req.body.email,
      };

      return res(ctx.status(201), ctx.json(userEmailAuth));
    },
  ),

  // 임시 비밀번호 발급 버튼 클릭 시 post 요쳥
  rest.post(
    'https://jsonplaceholder.typicode.com/user/find-password',
    (req, res, ctx) => {
      const userEmail = {
        email: req.body.email,
      };

      return res(ctx.status(201), ctx.json(userEmail));
    },
  ),
];
