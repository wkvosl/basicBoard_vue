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
        path:'/sign/input', name:'signUp',
        component: ()=>import('@/components/account/SignUp.vue'),
        meta:{
            requiresAuth : false,
            title:'회원가입',
            layout : ContentLayout
        },
    },
    {
         path:'/kakao/oauth/callback', name:'KakaoCallback',
        component: ()=>import('@/components/account/CallbackView.vue'),
        meta:{
            requiresAuth : false,
            title:'로그인중',
            layout : ContentLayout
        },
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
        path:'/board/create', name:'boardCreate',
        component: ()=> import('@/components/board/BoardCreate.vue'),
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
        path:'/gallery/create', name:'galleryCreate',
        component: ()=> import('@/components/gallery/GalleryCreate.vue'),
        meta:{
            layout : ContentLayout
        }
    },
    {
        path:'/file/save', name:'file',
        component: ()=>import('@/components/FileUpload.vue'),
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