<template>

	<div class="grid">
		<!-- 用户列表 -->
		<div class="col-12">
			<div class="card">
				<h5 class="text-center">商品管理</h5>
				<DataTable :value="list" v-model:selection="selectedProduct" dataKey="id" :rows="5" paginator
					responsiveLayout="scroll">
					<Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
					<!-- <Column style="width: 15%">
						<template #header>
							<input type="checkbox" :value="checkAll" @click="checkAll = !checkAll"
								:class="checkAll ? 'checkbox-checked' : ''" />
						</template>
<template #body="slotProps">
							<input type="checkbox" :value="slotProps.data.checkState"
								:class="slotProps.data.checkState ? 'checkbox-checked' : ''" />
						</template>
</Column> -->
					<Column field="id" header="序号" :sortable="true"></Column>
					<Column field="goods_name" header="商品名称" :sortable="true"></Column>
					<Column field="goods_price" header="单价" :sortable="true">
						<template #body="slotProps">
							￥{{ slotProps.data.goods_price }}
						</template>
					</Column>
					<Column header="数量" class="mw-150">
						<template #body="slotProps">
							<Button icon="pi pi-minus" size="small" rounded @click="changeAmount(slotProps.data, -1)" />
							<InputNumber v-model="slotProps.data.amount" class="w-5" style="width:50px" />
							<Button icon="pi pi-plus" size="small" rounded @click="changeAmount(slotProps.data, 1)" />
						</template>
					</Column>
					<Column field="tags" header="标签" :sortable="true">
						<template #body="slotProps">
							<InputText type="text" v-if="slotProps.data.inputVisible"
								class="form-control form-control-sm ipt-tag" v-focus v-model="slotProps.data.inputValue"
								@keyup.esc="slotProps.data.inputValue = ''" @blur="onInputConfig(slotProps.data)"
								@keyup.enter="onInputConfig(slotProps.data)" />
							<Button severity="primary" rounded label="+Tag" v-else
								@click="slotProps.data.inputVisible = true" />
							<Button severity="info" :label="item" rounded v-for="item in slotProps.data.tags"
								:key="item" />
						</template>
					</Column>
					<Column header="操作">
						<template #body="slotProps">
							<Button label="删除" severity="danger" outlined @click="onRemove(slotProps.data.id)">
								删除
							</Button>
						</template>
					</Column>
					<ColumnGroup type="footer">
						<Row>
							<Column footer="总计: ￥" :colspan="4" footerStyle="text-align:right" />
							<Column :footer="totalPrice" :colspan="3" footerStyle="text-align:left"
								style="color: var(--p-primary-color)" />
						</Row>
					</ColumnGroup>
				</DataTable>
			</div>
		</div>
	</div>

</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import request from "../../axios/request";
import ColumnGroup from "primevue/columngroup";
const list = ref([]);

const totalPrice = ref(0);

// const checkAll = ref(false);

const selectedProduct = ref();


onMounted(() => {
	request
		.get("mock/getGoodsList")
		.then((response) => {
			console.log(response);
			list.value = response.data.data[0].list;
			getTotalPrice();
		})
		.catch((error) => {
			console.log(error);
		});
});

// watch(checkAll, () => {
// 	updateStatus();
// });


const getTotalPrice = () => {
	totalPrice.value = 0;
	list.value.forEach((item) => {
		totalPrice.value += item.amount * item.goods_price;
	});
};


const changeAmount = (row, num) => {
	if (row.amount + num < 0) return;
	row.amount += num;
	getTotalPrice();
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

// const updateStatus = () => {
// 	console.log("updateStatus:" + checkAll.value);
// 	list.value.forEach((item) => {
// 		item.checkState = checkAll.value;
// 	});
// 	console.log(list.value);
// };


</script>

<style>
.p-inputnumber-input {
	width: 50px;
}

.p-checkbox-checked .p-checkbox-box {
	border-color: #ec4899 !important;
	background: #ec4899 !important;
}

.p-checkbox .p-checkbox-box .p-checkbox-icon {
	transition-duration: 0.2s !important;
	color: #ffffff !important;
	font-size: 0.875rem !important;
}

.p-datatable-paginator-bottom {
	border-color: #e2e8f0 !important;
}
</style>

<style scoped>
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
