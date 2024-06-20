<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watchEffect, watch } from 'vue';
import { useLayout } from './layout';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useConfirm } from 'primevue/useconfirm';

const confirm = useConfirm();


const { onMenuToggle } = useLayout();
const { removeAuthStore, nickname } = useAuthStore();

const homes = ref({
    icon: 'pi pi-bars'
});

const items = ref([]);

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
const route = useRoute();

const menu = ref();
const menuItems = ref([
    {
        items: [
            { label: '修改账号信息', icon: 'pi pi-pen-to-square', command: () => { visible.value = true } },
            { label: '退出登录', icon: 'pi pi-fw pi-sign-out', command: () => { logoutConfirm() } }
        ]
    }
]);

const visible = ref(false);


onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

watch(route, () => {

    const routeMatched = route.matched;
    // console.log("NavBar-routeMatched: ", routeMatched);
    let breadcrumb = [];
    for (let i = 0; i < routeMatched.length; i++) {
        if (routeMatched[i].meta.title) {
            breadcrumb.push({
                label: routeMatched[i].meta.title,
                route: routeMatched[i].path
            });
        }
    }
    console.log("NavBar-breadcrumb: ", breadcrumb);
    items.value = breadcrumb;
});


const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};

const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};

const logout = () => {
    removeAuthStore();
    router.push('/login');
}

const toggleMenu = (event) => {
    menu.value.toggle(event);
}

const dialogClose = () => {
    visible.value = false;
}

const logoutConfirm = () => {
    confirm.require({
        message: '确定要退出登录吗？',
        header: '退出登录',
        rejectProps: {
            label: '取消',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: '确认',
            severity: 'danger'
        },
        accept: () => {
            logout();
        },
    });
};


</script>

<template>
    <div class="layout-topbar">
        <router-link to="/" class="layout-topbar-logo">
            <img src="../assets/logo/logo.png" />
            <sapn>商品管理系统</sapn>
        </router-link>

        <!-- 缩进按钮 -->
        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()"><i
                class="pi pi-bars"></i></button>

        <button class="p-link layout-menu-button layout-topbar-button" @click="router.push('/home')"><i
                class="pi pi-home"></i></button>

        <Breadcrumb :home="homes" :model="items">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-surface-700 dark:text-surface-0">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>

        <!-- 右侧用户栏 -->
        <div class="layout-topbar-menu">
            <button class="p-link layout-topbar-button" @click="toggleMenu" aria-haspopup="true"
                aria-controls="overlay_menu">
                <i class="pi pi-user"></i>
                <span>用户</span>
            </button>
            <Menu :model="menuItems" ref="menu" id="overlay_menu" :popup="true" :class="'menu'" />
            <button class="p-link layout-topbar-button" v-tooltip.bottom="'退出'" @click="logoutConfirm">
                <i class="pi pi-sign-out"></i>
                <span>退出</span>
            </button>
        </div>
    </div>



    <Dialog v-model:visible="visible" modal header="修改账户信息" :style="{ width: '25rem' }">
        <div class="mb-5 field p-fluid flex flex-column">
            <label for="username" class="font-semibold w-24">当前昵称</label>
            <InputText id="username" class="flex-auto" disabled :value="nickname" />
        </div>
        <div class="mb-5 field p-fluid flex flex-column">
            <label for="username" class="font-semibold w-24">新昵称</label>
            <InputText id="username" class="flex-auto" />
        </div>
        <div class="mb-5 field p-fluid flex flex-column">
            <label for="username" class="font-semibold w-24">*旧密码</label>
            <InputText id="username" class="flex-auto" />
        </div>
        <div class="mb-5 field p-fluid flex flex-column">
            <label for="password" class="font-semibold w-24">新密码</label>
            <InputText id="password" class="flex-auto" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="取消" severity="secondary" @click="dialogClose"></Button>
            <Button type="button" label="保存" @click="dialogClose"></Button>
        </div>
    </Dialog>

    <ConfirmDialog></ConfirmDialog>

</template>

<style lang="scss">
.p-menu-item-link {
    color: var(--text-color) !important;
}

.p-menu-item-link:hover {
    background-color: var(--primary-color) !important;
    color: var(--text-color) !important;
}
</style>