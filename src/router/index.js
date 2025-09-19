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
        meta:{
            requiresAuth : false,
            title:'작업중!'
        }
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

router.afterEach((to) => {
    if(to.meta?.title){
        document.title = to.meta.title
    }else{
        document.title = "(기본제목) 작업중!"
    }
})

export default router;