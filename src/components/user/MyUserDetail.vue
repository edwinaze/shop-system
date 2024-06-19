<template>
	<div class="grid">
		<div class="col-3">
			<div class="card">
				<Image :src="user.avatar" alt="Image" width="300" />
			</div>
		</div>
		<div class="col-9">
			<div class="card">

				<div class="surface-section">
					<div class="font-medium text-3xl text-900 mb-3"><i class="pi pi-info-circle"
							style="font-size:1.8rem;"></i><span> 个人基本信息</span></div>
					<ul class="list-none p-0 m-0">
						<li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
							<div class="text-500 w-6 md:w-2 font-medium">姓名</div>
							<div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ user.name }}</div>
						</li>
						<li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
							<div class="text-500 w-6 md:w-2 font-medium">性别</div>
							<div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
								{{ user.sex === 1 ? "男" : "女" }}
							</div>
						</li>
						<li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
							<div class="text-500 w-6 md:w-2 font-medium">等级</div>
							<div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ user.level }}</div>
						</li>
						<li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
							<div class="text-500 w-6 md:w-2 font-medium">邮箱</div>
							<div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">{{ user.email }}
							</div>
						</li>
						<li
							class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
							<div class="text-500 w-6 md:w-2 font-medium">地址</div>
							<div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
								{{ user.address }}</div>
						</li>
					</ul>
				</div>

			</div>
		</div>
		<div class="col-12">
			<div class="card">
				<!-- 就业记录 -->
				<Fieldset legend="就业记录" :toggleable="true">
					<div v-for="(job, index) in user.employmentRecords" :key="index" class="p-mb-5">
						<p class="line-height-3 m-0 flex justify-content-between">
							<span class="font-bold">{{ job.year }}</span>
							<span class="p-ml-4">{{ job.location }}</span>
							<span class="p-ml-4 font-bold">{{ job.position }}</span>
						</p>
					</div>
				</Fieldset>
				<!-- 项目经历 -->
				<Fieldset legend="项目经历" :toggleable="true">
					<div v-for="(project, index) in user.projectExperiences" :key="index" class="p-mb-5">
						<p class="line-height-3 m-0 flex justify-content-between">
							<span class="font-bold">{{ project.title }}</span>
							<span class="p-ml-4 font-bold">{{ project.description }}</span>
						</p>
					</div>
				</Fieldset>
				<!-- 个人介绍 -->
				<Fieldset legend="个人介绍" :toggleable="true">
					<p class="line-height-3 m-0">
						{{ user.personalIntroduction }}
					</p>
				</Fieldset>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUrlStore } from "../../stores/url";
import axios from "axios";


onMounted(() => {
	const userId = route.params.id;
	fetchUserDetail(userId);
	console.log("用户详情", user);
});

const { popRoute } = useUrlStore();
const router = useRouter();
const route = useRoute();
const user = ref({});

const fetchUserDetail = async (id) => {
	try {
		const response = await axios.get(`/api/user/detail/${id}`);
		if (response.data.code === 200) {
			user.value = response.data.data;
		} else {
			console.error("id:" + id + "用户未找到");
		}
	} catch (error) {
		console.error("获取用户详情时出错", error);
	}
};

const goBack = () => {
	popRoute();
	router.back();
};


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
