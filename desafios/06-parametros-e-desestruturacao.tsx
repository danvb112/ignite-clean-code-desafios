
function updateUserRoute({
  body, 
  params
}) {
  updateUserController({
    data: body, 
    params
  })
}

function updateUserController({data, params}) {
  const {name, email, password} = data
  const {id} = params
  userRepository.update({
    email,
    id,
    name,
    password
  })
}

const userRepository = {
  update: ({
    name,
    email,
    password,
    id
  }) => {},
}