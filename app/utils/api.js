const maxPosts = 25;

export function getPostIds(category) {
  if (category !== 'top' && category !=='new') {
    throw `invalid category: ${category}`
  }

  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

export function getPost(id) {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

export function getPosts(category) {
  return getPostIds(category)
    .then((ids) => {
      const slicedIds = ids.slice(0, maxPosts)
      return Promise.all(slicedIds.map(getPost))
    })
}
