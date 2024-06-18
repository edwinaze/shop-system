import { createApp } from 'vue'
import App from './App.vue'

import './assets/styles.scss'

import './mock/mockServer'
import router from './router'

import PrimVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Password from 'primevue/password'



const app = createApp(App)

app.use(router);
app.use(PrimVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            cssLayer: true
        }
    }
});


app.component('InputText', InputText);
app.component('Button', Button);
app.component('Password', Password);

app.mount('#app');
