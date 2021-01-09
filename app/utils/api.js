const api = "https://hacker-news.firebaseio.com/v0"

export function fetchItem(id) {
  return fetch(`${api}/item/${id}.json`)
    .then(response => response.json())
}

export function fetchItems(ids) {
  return Promise.all(truncatedIds(ids).map(fetchItem))
}

export function fetchPosts(category) {
  return fetchPostIds(category)
    .then((ids) => {
      return Promise.all(truncatedIds(ids).map(fetchItem))
    })
}

function fetchPostIds(category) {
  return fetch(`${api}/${category}stories.json`)
    .then(response => response.json())
}

export function fetchUser(id) {
  return fetch(`${api}/user/${id}.json`)
    .then(response => response.json())
}

function truncatedIds(ids) {
  const maxPosts = 30
  return ids.slice(0, maxPosts)
}
