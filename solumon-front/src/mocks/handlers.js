import { rest } from 'msw';
let fakePosts = [];
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
  rest.post(
    'https://jsonplaceholder.typicode.com/users',
    async (req, res, ctx) => {
      //가상의 데이터
      let users = [
        { email: 'nick@example.com', passWord: '1234', id: 1 },
        { email: 'alice@example.com', passWord: '5678', id: 2 },
        { email: 'bob@example.com', passWord: 'abcd', id: 3 },
      ];
      // 클라이언트에서 전송된 정보에서 이메일과 비밀번호 추출
      const { email, passWord } = req.body;

      // 가상데이터에서 이메일과 비밀번호가 일치하는 사용자 찾기
      const matchedUser = users.find(
        (user) => user.email === email && user.passWord === passWord,
      );

      if (matchedUser) {
        return res(
          ctx.status(200),
          ctx.json({
            member_id: 1,
            is_firstLogin: true, //첫번째 로그인 유무
            access_token: 'ACCESS_TOKEN',
            refresh_token: 'REFRECH_TOKEN',
          }),
        );
      } else {
        return res(ctx.status(401), ctx.json({ error: 'Invalid credentials' }));
      }
    },
  ),

  //게시물작성 post
  rest.post('https://jsonplaceholder.typicode.com/posts', (req, res, ctx) => {
    const requestData = req.body;
    const newPostId = fakePosts.length + 1;
    const response = {
      post_id: newPostId,
      title: requestData.title,
      contents: requestData.contents,
      tags: requestData.tags,
      images: requestData.images.map((image, index) => ({
        ...image,
        index: index + 1,
        // representative: image.index === requestData.representative,
      })),
      vote: {
        choices: requestData.vote.choices.map((choice) => ({
          choice_num: choice.choice_num,
          choice_text: choice.choice_text,
        })),
        end_at: requestData.vote.end_at,
      },
    };
    fakePosts.push(requestData);
    return res(ctx.status(200), ctx.json(response));
  }),
  //post한 내용 get으로 가져오기 (..동작이 왜때문에...안될까?)
  // rest.get(
  //   'https://jsonplaceholder.typicode.com/posts/:postId',
  //   (req, res, ctx) => {
  //     const postId = Number(req.params.postId);
  //     const post = fakePosts.find((p) => p.post_id === postId);
  //     if (post) {
  //       return res(ctx.status(200), ctx.json(post));
  //     } else {
  //       return res(
  //         ctx.status(404),
  //         ctx.json({ message: '게시물을 찾을 수 없습니다.' }),
  //       );
  //     }
  //   },
  // ),
];
