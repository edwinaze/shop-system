<template>
	<table
		class="table table-striped table-bordered"
		style="table-layout: fixed; word-break: break-all"
	>
		<!-- 表格标题区域 -->
		<thead>
			<tr>
				<slot name="header"></slot>
			</tr>
		</thead>
		<!-- 表格主体区域 -->
		<tbody>
			<tr v-for="(item, index) in goodsList" :key="item.id">
				<slot name="body" :row="item" :index="index"></slot>
			</tr>
			<tr>
				<td>
					<input
						class="form-check-input"
						type="checkbox"
						id="checkAll"
						:value="amount"
						@click="checkAll"
					/>
					<label class="form-check-label ms-2" for="checkAll">
						全选
					</label>
				</td>
				<td colspan="5">合计：￥{{ totalPrice }}</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";

const totalPrice = ref(0);
const isCheckAll = ref(false);

watch(
	() => props.goodsList.map((item) => item.amount),
	(newVal, oldVal) => {
		console.log(newVal, oldVal);
		updatePrice();
	},
	{ deep: true }
);
// TODO
// 所有获取数据均用axio实现 √
// 套用零件管理系统登录页面或者另找一个
// 增加面包屑导航
// 用户详情页美化

const updatePrice = () => {
	totalPrice.value = 0;
	props.goodsList.forEach((item) => {
		totalPrice.value += item.amount * item.goods_price;
	});
	console.log(totalPrice.value);
};

const checkAll = (e) => {
	isCheckAll.value = e.target.checked;
	props.goodsList.forEach((item) => {
		item.checkState = isCheckAll.value;
	});
};

const props = defineProps({
	goodsList: {
		type: Array,
		required: true,
		default: [],
	},
});
</script>
