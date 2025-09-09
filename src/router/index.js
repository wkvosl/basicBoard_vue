import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/components/Home.vue";
import BoardList from "@/components/board/BoardList.vue";

const routes = [
    {
        path:'/',
        name:'home',
        component : Home,
    },
    {
        path:'/board/list',
        name:'boardList',
        component: BoardList
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;