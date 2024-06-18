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


<div class="login-box">
    <iframe
        class="login-left"
        src="https://my.spline.design/miniroomartcopy-fba1fa85669e48d4a6ec258fc8582d4f/"
        frameborder="0"
        width="100%"
        height="100%"
    ></iframe>
    <div
        class="login-right"
        style="
            background-color: #ffe6e6;
            margin-top: 5%;
            margin-right: 10%;
            border-radius: 5%;
        "
    >
        <div>
            <label
                for="email1"
                class="block text-900 text-xl font-medium mb-2"
                >Email</label
            >
            <InputText
                id="email1"
                type="text"
                placeholder="Email address"
                class="w-full md:w-30rem mb-5"
                style="padding: 1rem"
                v-model="email"
            />

            <label
                for="password1"
                class="block text-900 font-medium text-xl mb-2"
                >Password</label
            >
            <Password
                id="password1"
                v-model="password"
                placeholder="Password"
                :toggleMask="true"
                class="w-full mb-3"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
            ></Password>

            <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
            >
                <div class="flex align-items-center">
                    <Checkbox
                        v-model="checked"
                        id="rememberme1"
                        binary
                        class="mr-2"
                    ></Checkbox>
                    <label for="rememberme1">Remember me</label>
                </div>
                <a
                    class="font-medium no-underline ml-2 text-right cursor-pointer"
                    style="color: var(--primary-color)"
                    >Forgot password?</a
                >
            </div>
            <Button label="Sign In" class="w-full p-3 text-xl"></Button>
        </div>
        <form id="form" data-parsley-validate="">
            <div class="form-group">
                <label
                    for="username"
                    style="color: #8b5454; font-size: large"
                    >用户名</label
                >
                <!--        <input type="username" class="form-control" id="username" placeholder="请输入您的用户名" required="" data-parsley-trigger="change" data-parsley-remote data-parsley-remote-validator='username'>-->
                <input
                    type="username"
                    class="form-control"
                    id="username"
                    placeholder="请输入您的用户名"
                    required=""
                    data-parsley-trigger="change"
                    data-parsley-username=""
                />
            </div>

            <div class="form-group">
                <label
                    for="password"
                    style="color: #8b5454; font-size: large"
                    >密码</label
                >
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="请输入您的密码"
                    data-parsley-trigger="change"
                    required=""
                />
            </div>

            <div class="form-group">
                <input
                    class="btn btn-danger btn-block"
                    type="submit"
                    value="立即登录"
                />
            </div>
        </form>
    </div>
</div>