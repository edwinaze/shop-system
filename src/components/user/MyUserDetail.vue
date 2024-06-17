<template>
  <button @click="goBack">后退</button>
  <h4>用户{{ username }}的详情页面</h4>
</template>

<script setup>
import {ref,watch,reactive} from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  id: String
})
const username=ref('')
const userlist=JSON.parse(localStorage.getItem('userlist'))
console.log(typeof(userlist))
watch(()=>props.id,()=>{
  console.log(props.id)
  const user=userlist.find((item)=>props.id==item.id)
  console.log(user)
  username.value=user.name
},{immediate:true})
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>

<style scoped>
 button{
  background-color: #409eff;
  color: #fff;
 }
</style>