<template>
    <app-navbar />
    <div>
        <app-side-bar />
        <router-view />
    </div>
    <app-footer />


</template>

<script setup>
import { ref } from "vue";

</script>