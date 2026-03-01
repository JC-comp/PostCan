"use client";

export async function searchPosts(query: string, options: SearchOptions, filters: SearchFilters): Promise<ServerResponse<PostResponse[]>> {
  console.log('Querying posts for query:', query);
  console.log('Options:', options);
  console.log('Filters:', filters);
  const topics = ['JavaScript', 'Climate Change', 'Mechanical Keyboards', 'SpaceX', 'Home Brewing', 'Cybersecurity'];
  const prefixes = ['The Future of', 'A Guide to', 'Why I Love', 'The Problem with', 'Understanding', 'The Secret to'];
  const forums = ['TechTalk', 'General', 'Hobbies', 'News', 'DevLife'];

  const authors = [
    { name: 'Alex Rivera', avatar: 'https://i.pravatar.cc/150?u=u1' },
    { name: 'Sam Chen', avatar: 'https://i.pravatar.cc/150?u=u2' },
    { name: 'Jordan Smyth', avatar: 'https://i.pravatar.cc/150?u=u3' }
  ];
  const posts = Array.from({ length: 10 }, () => {
    const topic = topics[Math.floor(Math.random() * topics.length)];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];

    // Raw strings
    const rawTitle = `${prefix} ${topic}`;
    const rawExcerpt = `In this post, we dive deep into ${topic}. You might be surprised by what we found.`;

    // Formatted strings with <em> tags
    const formattedTitle = rawTitle.replace(topic, `<em>${topic}</em>`);
    const formattedExcerpt = rawExcerpt.replace(topic, `<em>${topic}</em>`);

    return {
      id: `post-${Math.random().toString(36).substr(2, 9)}`,
      title: rawTitle,
      excerpt: rawExcerpt,
      forum: forums[Math.floor(Math.random() * forums.length)],
      createdAt: new Date().toISOString(),
      author: authors[Math.floor(Math.random() * authors.length)],
      nsfw: Math.random() > 0.9,
      // The new _formatted property
      _formatted: {
        title: formattedTitle,
        excerpt: formattedExcerpt
      }
    };
  });

  try {
    return {
      status: 'success',
      data: posts
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