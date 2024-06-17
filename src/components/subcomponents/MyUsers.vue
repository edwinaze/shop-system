<template>
  <!-- 标题 -->
  <h4 class="text-center">用户管理</h4>
  <!-- 用户列表 -->
  <table class="table table-striped table-hover table-bordered">
    <thead>
      <tr>
        <th>序号</th>
        <th>姓名</th>
        <th>等级</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in userlist" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.level }}</td>
        <td>
          <router-link :to="'/home/users/' + item.id">详情</router-link>
        </td>
      </tr>
    </tbody>
  </table> 
</template>

<script setup>
const  userlist = [
  { id: '1',name: '张三',level: '一级客户' },
  { id: '2',name: '李四',level: '二级客户' },
  { id: '3',name: '王五',level: '三级客户' },
  { id: '4',name: '赵六',level: '四级客户' },
]

localStorage.setItem('userlist',JSON.stringify(userlist))
</script>
