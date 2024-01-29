import jwt from 'jsonwebtoken'

export const createUserToken = async (user, req, res) => {
  const token = jwt.sign({
    name: user.name,
    id: user._id
  }, 'my-secret')

  res.status(200).json({
    message: "You're authenticated",
    token
  })
}