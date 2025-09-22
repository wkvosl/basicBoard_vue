import {createRouter, createWebHistory} from 'vue-router'
import MainLayout from "@/components/layout/MainLayout.vue";
import ContentLayout from "@/components/layout/ContentLayout.vue";

const routes = [
    {
        path:'/', name:'home',
        component : ()=> import('@/components/Home.vue'),
        meta:{
            requiresAuth : false,
            title:'작업중!',
            layout : MainLayout
        }
    },
    {
        path:'/board/list', name:'boardList',
        component : ()=> import('@/components/board/BoardList.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/board/:id', name:'boardDetail',
        component: ()=> import('@/components/board/BoardDetail.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/board/modify/:id', name:'boardModify',
        component: ()=>import('@/components/board/BoardModify.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/gallery/list', name:'galleryList',
        component : ()=> import('@/components/gallery/GalleryList.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/gallery/:id', name:'galleryDetail',
        component: ()=> import('@/components/gallery/GalleryDetail.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/gallery/modify/:id', name:'galleryModify',
        component: ()=>import('@/components/gallery/GalleryModify.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/file/save', name:'file',
        component: ()=>import('@/components/file.vue'),
        meta:{
        }
    },
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