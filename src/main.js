import { createApp } from 'vue';
import App from './App.vue';

import './assets/styles.scss';

import './mock/mockServer';
import router from './router/index';

import PrimVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Password from 'primevue/password';
import Tooltip from 'primevue/tooltip';
import Menu from 'primevue/menu';
import Dialog from 'primevue/dialog';
import DataTable from 'primevue/datatable';
import ConfirmDialog from 'primevue/confirmdialog';
import ConfirmationService from 'primevue/confirmationservice';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Checkbox from 'primevue/checkbox';
import Breadcrumb from 'primevue/breadcrumb';
import Row from 'primevue/row';


import { createPinia } from 'pinia';



const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
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
app.use(ConfirmationService);

app.directive('tooltip', Tooltip);

app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Button', Button);
app.component('Password', Password);
app.component('Menu', Menu);
app.component('Dialog', Dialog);
app.component('ConfirmDialog', ConfirmDialog);
app.component('Breadcrumb', Breadcrumb);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Checkbox', Checkbox);
app.component('Row', Row);

app.mount('#app');
