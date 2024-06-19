<script setup>
import { ref } from 'vue';
import AppSidebarItem from './AppSidebarItem.vue';

const model = ref([
    {

        items: [{ label: '首页', icon: 'pi pi-fw pi-home', to: '/home' }]
    },
    {

        items: [{ label: '客户管理', icon: 'pi pi-fw pi-user', to: '/users' }]
    },
    {

        items: [{ label: '商品管理', icon: 'pi pi-fw pi-shopping-cart', to: '/goods' }]
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