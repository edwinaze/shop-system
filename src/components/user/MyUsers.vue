<template>
	<div class="grid">
		<!-- 用户列表 -->
		<div class="col-12">
			<div class="card">
				<h5 class="text-center">用户管理</h5>
				<DataTable :value="userlist" :rows="5" paginator responsiveLayout="scroll">
					<Column field="id" style="width: 15%" header="序号" :sortable="true"></Column>
					<Column field="name" header="姓名" :sortable="true" style="width: 35%"></Column>
					<Column field="level" header="等级" :sortable="true" style="width: 35%"></Column>
					<Column style="width: 15%">
						<template #header> 操作 </template>
						<template #body="slotProps">
							<Button icon="pi pi-search" type="button" class="p-button-text"
								@click="routeToDetails(slotProps.data.id, slotProps.data.name)"></Button>
						</template>
					</Column>
				</DataTable>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import request from "../../axios/request";
import { useRouter } from "vue-router";
import { useUrlStore } from "../../stores/url";

const router = useRouter();
const { pushRoute } = useUrlStore();


const routeToDetails = (id, name) => {
	pushRoute("/users/" + id, name + " 用户详情");
	router.push({ name: "details", params: { id: id } });
};



onMounted(() => {
	request.get("/api/users").then((res) => {
		userlist.value = res.data.data;
		console.log(res.data.data);
	});
});

const userlist = ref([]);

localStorage.setItem("userlist", JSON.stringify(userlist));
</script>

<style>
.p-datatable-paginator-bottom {
	border-color: #e2e8f0 !important;
}
</style>