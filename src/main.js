import {
    createApp
} from 'vue'
import {
    createRouter,
    createWebHistory
} from 'vue-router'

import App from './App.vue'
import EmployeeTable from './components/EmployeeTable.vue'
import Employee from './components/Employee.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/table',
            component: EmployeeTable
        }, {
            path: '/add',
            component: Employee
        },
        {
            path: '/edit/:employeeId',
            component: Employee
        }
    ],

});


createApp(App).use(router).mount('#app')