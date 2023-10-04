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
  // PostLists 페이지 - 아직 고민중인 고민들, 채팅 참여 많은, 투표 참여 많은
  rest.get(
    'https://jsonplaceholder.typicode.com/posts',
    async (req, res, ctx) => {
      const postStatus = req.url.searchParams.get('postStatus');
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
