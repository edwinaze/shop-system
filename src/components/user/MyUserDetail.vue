<template>
	<div class="user-detail">
		<button @click="goBack">后退</button>
		<h4 class="text-center">客户详情</h4>
		<table class="table table-striped table-hover table-bordered">
			<tbody>
				<tr>
					<td>序号</td>
					<td>{{ user.id }}</td>
				</tr>
				<tr>
					<td>姓名</td>
					<td>{{ user.name }}</td>
				</tr>
				<tr>
					<td>等级</td>
					<td>{{ user.level }}</td>
				</tr>
				<tr>
					<td>头像</td>
					<td>
						<img :src="user.avatar" alt="avatar" class="avatar" />
					</td>
				</tr>
				<tr>
					<td>地址</td>
					<td>{{ user.address }}</td>
				</tr>
				<tr>
					<td>详细说明</td>
					<td>{{ user.description }}</td>
				</tr>
				<tr>
					<td>电话</td>
					<td>{{ user.phone }}</td>
				</tr>
				<tr>
					<td>邮箱</td>
					<td>{{ user.email }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const user = ref({});

const fetchUserDetail = async (id) => {
	try {
		const response = await axios.get(`/api/user/detail/${id}`);
		if (response.data.code === 200) {
			user.value = response.data.data;
		} else {
			console.error("用户未找到");
		}
	} catch (error) {
		console.error("获取用户详情时出错", error);
	}
};

const goBack = () => {
	router.back();
};

onMounted(() => {
	const userId = route.params.id;
	fetchUserDetail(userId);
});
</script>

<style scoped>
.user-detail {
	margin: 20px;
}

.avatar {
	width: 100px;
	height: 100px;
	border-radius: 50%;
}
button {
	background-color: #409eff;
	color: #fff;
}
</style>
