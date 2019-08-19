import Mock from 'mockjs'

const adminUser = [
  {
    id: 0,
    username: '13657207907',
    roles: ['AM'],
  },
  {
    id: 1,
    username: '18872211874',
    roles: ['FPTZ'],
  },
]

Mock.mock('/login', 'post', opt => {
  const postData = JSON.parse(opt.body)
  const { username } = postData
  const user = adminUser.filter(item => item.username === username)
  if (user.length > 0) {
    return {
      code: 1,
      data: { token: new Date().valueOf() },
    }
  }
  return {
    code: 0,
    error: '账号不存在',
  }
})

Mock.mock('/getInfo', 'post', opt => {
  const postData = JSON.parse(opt.body)
  const { token } = postData
  if (token) {
    return {
      code: 1,
      data: {
        roles: ['AM'],
      },
    }
  }
})

export default Mock
