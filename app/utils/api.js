const maxPosts = 25
const postType = 'story'

function getPostIds(category) {
  if (category !== 'top' && category !== 'new') {
    throw `invalid category: ${category}`
  }

  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/${category}stories.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

function getPost(id) {
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

function getUserProfile(id) {
  const endpoint = window.encodeURI(`https://hacker-news.firebaseio.com/v0/user/${id}.json`)
  return fetch(endpoint)
    .then(response => response.json())
}

function getUserPosts(id) {
  return getUserProfile(id)
    .then((data) => {
      const { submitted: postIds } = data
      return Promise.all(postIds.map(getPost))
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
