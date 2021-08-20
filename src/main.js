import {
    createApp
} from 'vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import App from './App.vue'
import EmployeeTable from './components/EmployeeTable.vue'
import AddEmployee from './components/AddEmployee.vue'
import EditEmployee from './components/EditEmployee.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/table',
            component: EmployeeTable
        }, {
            path: '/add',
            component: AddEmployee
        },
        {
            path: '/edit',
            component: EditEmployee
        }
    ],

});


createApp(App).use(router).mount('#app')