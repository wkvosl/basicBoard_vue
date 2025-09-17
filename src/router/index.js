import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/components/Home.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardModify from "@/components/board/BoardModify.vue";

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
    },
    {
        path:'/board/:id',
        name:'boardDetail',
        component: BoardDetail
    },
    {
        path:'/board/modify/:id',
        name:'boardModify',
        component: BoardModify
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;