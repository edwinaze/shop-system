<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">客户数</span>
            <div class="text-900 font-medium text-xl ">{{ overlook.clientNumber }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-users text-blue-500 text-xl"></i>
          </div>
        </div>
        <span class="text-green-500 font-medium">新增 {{ overlook.growPeople }}</span>
        <span class="text-500 ml-2">在上次登录前</span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">收入</span>
            <div class="text-900 font-medium text-xl">￥{{ overlook.revenue }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-wallet text-orange-500 text-xl"></i>
          </div>
        </div>
        <span class="text-500">同比上周上升</span>
        <span class="text-green-500 font-medium ml-2">%{{ overlook.growPercent }}+ </span>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-4">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">商品数</span>
            <div class="text-900 font-medium text-xl ml-2">{{ overlook.goodsNumber }}</div>
          </div>
          <div class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem">
            <i class="pi pi-cart-arrow-down text-cyan-500 text-xl"></i>
          </div>
        </div>
        <span class="text-500">新进商品</span>
        <span class="text-green-500 font-medium ml-2">{{ overlook.growGoods }} </span>
      </div>
    </div>

    <div class="col-12">
      <div class="card mb-0">
        <h3 class="bg-primary p-3">😄😄😄😄😄</h3>
        <p class="bg-info border-round p-3"> 🎉🎉🎉商品管理系统欢迎您！🎉🎉🎉</p>

      </div>
    </div>

  </div>

</template>

<script setup>
import Checkbox from 'primevue/checkbox';
import { ref } from 'vue';

const overlook = ref({
  clientNumber: 123,
  growPeople: 323,
  revenue: 23,
  growPercent: 57,
  goodsNumber: 123,
  growGoods: 3214,
});

</script>

<style lang="less"></style>