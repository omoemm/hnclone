export function getItem(id) {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

export function getItems(ids) {
  return Promise.all(truncatedIds(ids).map(getItem))
}

export function getPosts(category) {
  return getPostIds(category)
    .then((ids) => {
      return Promise.all(truncatedIds(ids).map(getItem))
    })
}

function getPostIds(category) {
  if (category !== 'top' && category !== 'new') {
    throw `invalid category: ${category}`
  }

  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

export function getUser(id) {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

function truncatedIds(ids) {
  const maxPosts = 30
  return ids.slice(0, maxPosts)
}
