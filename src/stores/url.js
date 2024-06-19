import { defineStore } from "pinia";
import { ref } from "vue";

export const useUrlStore = defineStore('url', () => {
    const routeList = ref(['/home']);
    const routeNameList = ref(['Home']);

    function pushRoute(route, name) {
        routeList.value.push(route);
        routeNameList.value.push(name);
    }

    function popRoute() {
        routeList.value.pop();
        routeNameList.value.pop();
    }

    function getRouteList() {
        return routeList.value;
    }

    function getRouteNameList() {
        return routeNameList.value;
    }

    function getNowRoute() {
        return routeList.value[routeList.value.length - 1];
    }

    function getNowRouteName() {
        return routeNameList.value[routeNameList.value.length - 1];
    }

    function clearRoute() {
        routeList.value = [];
        routeNameList.value = [];
    }

    function getNowRouteChain() {
        const route = "";
        routeList.value.forEach((item) => {
            route += item;
        });
        return route;
    }
    return { routeList, routeNameList, pushRoute, popRoute, getRouteList, getRouteNameList, getNowRouteName, getNowRoute, clearRoute, getNowRouteChain }
})
