<template>
	<h4>商品管理</h4>

	<MyTable :goodsList="list">
		<template v-slot:header>
			<th scope="col" style="width: 90px">#</th>
			<th scope="col" style="width: 50px">序号</th>
			<th scope="col">商品名称</th>
			<th scope="col" style="width: 100px">价格</th>
			<th scope="col" style="width: 200px">数量</th>
			<th scope="col">标签</th>
			<th scope="col" style="width: 100px">操作</th>
		</template>
		<!-- row-list中的每一项，index-下标 -->
		<template #body="{ row, index }">
			<td>
				<div class="view">
					<input
						class="form-check-input"
						type="checkbox"
						v-model="row.checkState"
					/>
				</div>
			</td>
			<td>{{ index + 1 }}</td>
			<td>{{ row.goods_name }}</td>
			<td>￥{{ row.goods_price }}</td>
			<td class="flex-container">
				<!-- <div class="row gy-2 gx-3 align-items-center">
					<div class="col-auto"> -->
				<button
					type="button"
					class="mr-0 btn btn-light rounded-circle"
					@click="changeAmount(row, -1)"
				>
					-
				</button>
				<!-- </div>

					<div class="col-sm-2"> -->
				<input
					type="tel"
					class="form-control"
					:value="row.amount"
					style="width: 50px"
				/>
				<!-- </div>
					<div class="col-auto"> -->
				<button
					type="button"
					class="btn btn-primary rounded-circle"
					@click="changeAmount(row, 1)"
				>
					+
				</button>
				<!-- </div>
				</div> -->
			</td>
			<td>
				<input
					type="text"
					v-if="row.inputVisible"
					class="form-control form-control-sm ipt-tag"
					v-focus
					v-model="row.inputValue"
					@keyup.esc="row.inputValue = ''"
					@blur="onInputConfig(row)"
					@keyup.enter="onInputConfig(row)"
				/>
				<button
					class="btn btn-outline-primary rounded-pill"
					v-else
					@click="row.inputVisible = true"
				>
					+Tag
				</button>
				<span
					class="btn btn-outline-dark"
					v-for="item in row.tags"
					:key="item"
				>
					{{ item }}
				</span>
			</td>
			<td>
				<button
					type="button"
					class="btn btn-outline-danger btn-sm"
					@click="onRemove(row.id)"
				>
					删除
				</button>
			</td>
		</template>
	</MyTable>
	<!-- <GoodsFooter :lastLength="list.length" @updateStatus="updateStatus" /> -->
</template>

<script setup>
import MyTable from "../goods/MyTable.vue";
import GoodsFooter from "../goods/GoodsFooter.vue";
import { ref, computed } from "vue";
import request from "../../axios/request";
const list = ref([]);
request
	.get("mock/getGoodsList")
	.then((response) => {
		console.log(response);
		list.value = response.data.data[0].list;
	})
	.catch((error) => {
		console.log(error);
	});

const changeAmount = (row, num) => {
	if (row.amount + num < 0) return;
	row.amount += num;
};

const onRemove = (id) => {
	list.value = list.value.filter((item) => item.id != id);
};
const vFocus = (el) => {
	el.focus();
};

const onInputConfig = (row) => {
	const val = row.inputValue;
	row.inputValue = "";
	row.inputVisible = false;
	if (!val || row.tags.indexOf(val) !== -1) {
		return;
	}
	row.tags.push(val);
};

const updateStatus = (status) => {
	if (status === "all") {
		list.value.forEach((item) => {
			item.checkState = true;
		});
		return list.value;
	}
	if (status === "active") {
		return (list.value = list.value.filter((item) => !item.checkState));
	}
	if (status === "completed") {
		return (list.value = []);
	}
};
</script>

<style scoped>
.flex-container {
	display: flex;
	align-items: center;
	justify-content: center;
}
th {
	text-align: center;
}
td {
	line-height: 30px;
}
.ipt-tag {
	width: 80px;
	display: inline;
}
input,
span,
button {
	margin-right: 10px;
}
</style>
