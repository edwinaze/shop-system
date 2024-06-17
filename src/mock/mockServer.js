import Mock from 'mockjs'
import goodsList from './goodsList.json'
var data = Mock.mock('/mock/getGoodsList', 'get', {
  data: goodsList
})

const users = [
  {
    id: 1,
    username: '123',
    password: '123',
    token: 'abc123'
  }
];

const userDetailList = [
  {
    id: '1',
    name: '张三',
    level: '一级客户',
    avatar: 'https://via.placeholder.com/150',
    address: '北京市海淀区',
    description: '这是张三的详细说明。',
    phone: '1234567890',
    email: 'zhangsan@example.com'
  },
  {
    id: '2',
    name: '李四',
    level: '二级客户',
    avatar: 'https://via.placeholder.com/150',
    address: '上海市浦东新区',
    description: '这是李四的详细说明。',
    phone: '0987654321',
    email: 'lisi@example.com'
  },
  {
    id: '3',
    name: '王五',
    level: '三级客户',
    avatar: 'https://via.placeholder.com/150',
    address: '广州市天河区',
    description: '王五的详细说明',
    phone: '1234567890',
    email: 'lisi@example.com'
  },
  {
    id: '4',
    name: '赵六',
    level: '四级客户',
    avatar: 'https://via.placeholder.com/150',
    address: '深圳市南山区',
    description: '赵六的详细说明',
    phone: '0987654321',
    email: 'lisi@example.com'
  },

];

// 模拟获取用户详情的接口
Mock.mock(/\/api\/user\/detail\/\d+/, 'get', (options) => {
  const id = options.url.match(/\/api\/user\/detail\/(\d+)/)[1];
  const user = userDetailList.find(user => user.id === id);
  if (user) {
    return {
      code: 200,
      message: '成功',
      data: user
    };
  } else {
    return {
      code: 404,
      message: '用户未找到'
    };
  }
});

// 模拟登录接口
Mock.mock('/api/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  const user = users.find(user => user.username === username && user.password === password);
  if (user) {
    return {
      code: 200,
      message: '登录成功',
      data: {
        userId: user.id,
        userName: user.username,
        token: user.token
      }
    };
  } else {
    return {
      code: 401,
      message: '用户名或密码错误'
    };
  }
});

// 模拟注册接口
Mock.mock('/api/register', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  const userExists = users.some(user => user.username === username);
  if (userExists) {
    return {
      code: 400,
      message: '用户名已存在'
    };
  } else {
    const newUser = {
      id: users.length + 1,
      username,
      password,
      token: 'abc' + (users.length + 1)
    };
    users.push(newUser);
    return {
      code: 200,
      message: '注册成功',
      data: {
        userId: newUser.id,
        userName: newUser.username,
        token: newUser.token
      }
    };
  }
});
