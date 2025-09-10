import {createRouter, createWebHistory} from 'vue-router'
import Home from "@/components/Home.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardDetail from "@/components/board/BoardDetail.vue";
import BoardList2 from "@/components/board/BoardList2.vue";

const routes = [
    {
        path:'/',
        name:'home',
        component : Home,
    },
    {
        path:'/board/list',
        name:'boardList',
        component: BoardList2
    },
    {
        path:'/board/:id',
        name:'boardDetail',
        component: BoardDetail
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;