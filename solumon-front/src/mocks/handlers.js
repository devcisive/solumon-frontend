import { rest } from 'msw';

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
        ])
      );
    }
  ),
];
