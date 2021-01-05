function getPostIds(category) {
  if (category !== 'top' && category !=='new') {
    throw 'invalid category'
  }

  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
  return fetch(endpoint)
    .then((res) => res.json())
}

export function getPosts(category) {
  return getPostIds(category)
}