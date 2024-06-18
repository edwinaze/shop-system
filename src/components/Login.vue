<template>
	<div
		class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
		<div class="flex flex-column align-items-center justify-content-center relative">
			<img src="../assets/logo/avatar_default.png" alt="Sakai logo" class="w-6rem flex-shrink-0 absolute"
				style="top: -60px" />
			<div style="
					border-radius: 56px;
					padding: 0.3rem;
					background: linear-gradient(180deg,var(--primary-color) 10%,rgba(33, 150, 243, 0) 30%);
				">
				<div class="surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
					<div class="text-900 text-2xl font-medium mb-5 w-full text-center">
						商品管理系统欢迎您
					</div>
					<div>
						<div class="mb-5 field p-fluid flex flex-column">
							<label for="username1" class="block text-600 text-base font-medium mb-2">账号</label>
							<InputText id="username1" type="text" placeholder="请输入账号" class="w-full md:w-30rem"
								variant="filled" style="padding: 1rem" v-model="username" :invalid="isLoginWrong" />
							<small v-if="isLoginWrong" style="color:#f87171">账号密码错误</small>
						</div>
						<div class="mb-5 field p-fluid flex flex-column">
							<label for="password1" class="block text-600 font-medium text-base mb-2">密码</label>
							<Password id="password1" v-model="password" placeholder="请输入密码" :toggleMask="true"
								class="w-full md:w-30rem" inputClass="w-full" variant="filled" :feedback="false"
								:inputStyle="{ padding: '1rem' }" :invalid="isLoginWrong">
							</Password>
							<small v-if="isLoginWrong" style="color:#f87171">账号密码错误</small>
						</div>
						<Button label="登录" class="w-full p-3 text-xl" @click="onLogin"></Button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import "../assets/aura-light-pink/theme.css";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");

const message = ref("");
const isLoginCorrect = ref(false);
const isLoginWrong = ref(false);

watch(message, () => {
	if (message.value === "登录成功") {
		isLoginCorrect.value = true;
	} else {
		isLoginCorrect.value = false;
	}
});

async function onLogin() {
	try {
		const response = await axios.post("/api/login", {
			username: username.value,
			password: password.value,
		});
		if (response.data.code === 200) {
			message.value = "登录成功";
			router.push("/home");
			localStorage.setItem("isLogin", true);
		} else {
			message.value = response.data.message;
			isLoginWrong.value = true;
			localStorage.removeItem("isLogin");
		}
	} catch (error) {
		message.value = "未知错误，请联系管理员";
	}
}
</script>

<style lang="less" scoped>
.pi-eye {
	transform: scale(1.6);
	margin-right: 1rem;
}

.pi-eye-slash {
	transform: scale(1.6);
	margin-right: 1rem;
}
</style>
