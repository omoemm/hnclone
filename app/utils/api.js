export function getPostIds(category) {
  if (category !== 'tops' && category !=='new') {
    throw 'invalid category'
  }

  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
  return fetch(endpoint)
    .then((res) => res.json())
}