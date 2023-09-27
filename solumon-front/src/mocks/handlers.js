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

export const handlers = [
  rest.get(
    'https://jsonplaceholder.typicode.com/posts',
    async (req, res, ctx) => {
      return res(
        ctx.json([
          {
            writer: 'chacha',
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
            writer: 'chacha',
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
            writer: 'chacha',
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
            writer: 'chacha',
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
            writer: 'chacha',
            post_id: 5,
            created_at: '2023-09-24',
            chat_count: 7,
            vote_count: 19,
            image_url: 'https://via.placeholder.com/600/f66b97',
            title: 'nesciunt quas odio',
            preview:
              'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
          },
        ]),
      );
    },
  ),

  // POST 요청 핸들러
  rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    // 새 사용자 데이터를 POST 요청으로 추가
    const newUser = {
      member_id: req.body.member_id,
      nickname: req.body.nickname,
      email: req.body.email,
    };
    users.push(newUser);

    return res(ctx.status(201), ctx.json(newUser));
  }),

  // GET 요청 핸들러
  rest.get('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
    // GET 요청을 가로채고 현재 사용자 데이터를 반환
    return res(ctx.status(200), ctx.json(users));
  }),
];
// rest.get(
//   'https://jsonplaceholder.typicode.com/users',
//   async (req, res, ctx) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           member_id: req.body.member_id,
//           nickname: req.body.nickname,
//           email: req.body.email,
//         },
//       ]),
//     );
//   },
// ),
// rest.post('https://jsonplaceholder.typicode.com/users', (req, res, ctx) => {
//   // POST 요청을 가로채고 원하는 응답을 제공
//   return res(
//     ctx.status(201), // 응답 상태 코드 (예: 201 Created)
//     ctx.json({
//       member_id: req.body.member_id,
//       nickname: req.body.nickname,
//       email: req.body.email,
//     }),
//   );
// }),
// ];
