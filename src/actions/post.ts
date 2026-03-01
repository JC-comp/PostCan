"use client";

export async function getPost(postId: string): Promise<ServerResponse<PostDetail>> {
  console.log('Querying post for post ID:', postId);
  const topicsPool = ['Web3', 'Rust', 'Tailwind', 'AI', 'Ux Design', 'Photography', 'VanLife'];
  const forums = [
    { name: 'TechTalk', alias: 'tech_talk' },
    { name: 'General', alias: 'gen_discussions' },
    { name: 'Showcase', alias: 'user_showcase' }
  ];

  const selectedForum = forums[Math.floor(Math.random() * forums.length)];
  const topicCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 topics
  const randomTopics = [...topicsPool].sort(() => 0.5 - Math.random()).slice(0, topicCount);

  const content = `
    <p>In this deep dive, we explore the nuances of ${randomTopics[0]}.</p>
    <p>Many developers struggle with the initial setup, but once you master the basics of ${randomTopics[1] || 'this field'}, the workflow becomes seamless.</p>
    <blockquote>"The best way to predict the future is to invent it."</blockquote>
    <p>Check out the documentation for more details on implementation.</p>
  `.trim();

  try {
    return {
      status: 'success',
      data: {
        id: 0,
        content: content,
        forumAlias: selectedForum.alias,
        version_count: Math.floor(Math.random() * 5) + 1,
        topics: randomTopics,

        likeCount: Math.floor(Math.random() * 500),
        quoteCount: Math.floor(Math.random() * 50),
        shareCount: Math.floor(Math.random() * 100),
        collectionCount: Math.floor(Math.random() * 200),
        totalCommentCount: Math.floor(Math.random() * 80),

        title: `Deep Dive into ${randomTopics[0]}`,
        excerpt: `Everything you need to know about ${randomTopics[0]} in one place.`,
        forum: selectedForum.name,
        createdAt: new Date().toISOString(),
        author: {
          name: 'Guest Author',
          avatar: 'https://i.pravatar.cc/150?u=u1'
        },
        nsfw: Math.random() > 0.95,
      }
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 'error',
      statusCode: 500,
      message: 'The database is currently unavailable.'
    };
  }
}