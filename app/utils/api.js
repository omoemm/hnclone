const postType = 'story'

function getPostIds(category) {
  if (category !== 'top' && category !== 'new') {
    throw `invalid category: ${category}`
  }

  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

export function getItem(id) {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

export function getItems(ids) {
  return Promise.all(ids.map(getItem))
}

export function getPosts(category) {
  return getPostIds(category)
    .then((ids) => {
      return Promise.all(truncatedIds(ids).map(getItem))
    })
}

function getUserProfile(id) {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

function truncatedIds(ids) {
  const maxPosts = 25
  return ids.slice(0, maxPosts)
}

function getUserPosts(id) {
  return getUserProfile(id)
    .then((data) => {
      const { submitted: postIds } = data
      return Promise.all(truncatedIds(postIds).map(getItem))
        .then(data => {
          return data.filter((post) => post.type === postType)
        })
    })
}

export function getUserData(id) {
  return Promise.all([
    getUserProfile(id),
    getUserPosts(id)
  ])
}
