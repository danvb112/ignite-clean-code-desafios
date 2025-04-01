// Nomenclatura de variáveis

const userCategoriesList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getData(req, res) {
  const githubUsername = String(req.query.username)

  if (!githubUsername) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const githubUserResponse = await fetch(`https://api.github.com/users/${githubUsername}`);

  if (githubUserResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${githubUsername}" not found`
    })
  }

  const githubUserJSON = await githubUserResponse.json()

  const userCategoriesSortedDescendingOrder = userCategoriesList.sort((a, b) =>  b.followers - a.followers); 

  const githubUserCategory = userCategoriesSortedDescendingOrder.find(userCategory => githubUserJSON.followers > userCategory.followers)

  const githubUserNameAndCategory = {
    githubUsername,
    category: githubUserCategory.title
  }

  return githubUserNameAndCategory
}

getData({ query: {
  username: 'josepholiveira'
}}, {})