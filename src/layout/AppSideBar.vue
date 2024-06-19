<script setup>
import { ref } from 'vue';
import AppSidebarItem from './AppSidebarItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/home' }]
    },
    {
        label: 'ClientManage',
        items: [{ label: 'ClientList', icon: 'pi pi-fw pi-user', to: '/users' }]
    },
    {
        label: 'GoodsManage',
        items: [{ label: 'GoodsList', icon: 'pi pi-fw pi-shopping-cart', to: '/goods' }]
    }
])


</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-sidebar-item v-if="!item.separator" :item="item" :index="i"></app-sidebar-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>