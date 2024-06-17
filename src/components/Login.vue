<template>
	<div class="login-container">
		<div class="login-box">
			<!-- 头像区域 -->
			<div class="avatar-box">
				<img class="avatar" src="../assets/avatar_default.png" />
			</div>
			<!-- 表单区域 -->
			<div class="form-login">
				<!-- 登录名称 -->
				<div class="form-group">
					<label for="username">登录名称：</label>
					<input
						type="text"
						class="form-control"
						id="username"
						placeholder="请输入登录名称"
						autocomplete="off"
						v-model.trim="username"
					/>
				</div>
				<!-- 登录密码 -->
				<div class="form-group">
					<label for="password">登录密码：</label>
					<input
						type="password"
						class="form-control"
						id="password"
						placeholder="请输入登录密码"
						v-model.trim="password"
					/>
				</div>
				<div :class="isLoginCorrect ? 'accept' : 'wrong'">
					{{ message }}
				</div>
				<!-- 登录按钮 -->
				<div class="form-group">
					<button type="button" class="btn" @click="onLogin">
						登录
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const username = ref("");
const password = ref("");
const message = ref("");
const isLoginCorrect = ref(false);
// const onLogin = () => {
// 	if (username.value === "admin" && password.value === "123456") {
// 		router.push("/home");
// 		return localStorage.setItem("isLogin", true);
// 	} else {
// 		alert("用户名或密码输入错误");
// 		localStorage.removeItem("isLogin");
// 	}
// };

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
			localStorage.removeItem("isLogin");
		}
	} catch (error) {
		message.value = "未知错误，请联系管理员";
	}
}
</script>

<style lang="less" scoped>
.accept {
	color: green;
}

.wrong {
	color: red;
}

.login-container {
	background-color: #35495e;
	height: 100%;
	.login-box {
		width: 400px;
		height: 250px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
		.form-login {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			box-sizing: border-box;
			padding: 1.5rem !important;
			.form-group {
				padding-top: 20px;
				.btn {
					background-color: deepskyblue;
					color: #fff;
				}
			}
		}
	}
}
.form-control {
	flex: 1;
	padding: 0.5rem;
}
.avatar-box {
	position: absolute;
	width: 100%;
	top: -65px;
	left: 0;
	.avatar {
		width: 120px;
		height: 120px;
		border-radius: 50% !important;
		box-shadow: 0 0 6px #efefef;
		background-color: #fff;
	}
}
</style>
