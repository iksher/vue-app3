import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginScreen from '../components/LoginComponent.vue';
import WelcomeScreen from '../components/ProfileComponent/components/WelcomeComponent.vue';
import UserInfoScreen from '../components/ProfileComponent/components/UserInfoComponent.vue';
import { useUserStore } from '../store/store';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Login',
        component: LoginScreen,
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: WelcomeScreen,
        meta: { requiresAuth: false },
    },
    {
        path: '/userinfo',
        name: 'UserInfo',
        component: UserInfoScreen,
        meta: { requiresAuth: false },
    },
    { path: '/:pathMatch(.*)*', redirect: '/login' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();
    //TODO : USER TOKEN LATER
    // const isAuthenticated = userStore.token !== '';
    const isAuthenticated = userStore.token !== '';

    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login');
    } else {
        next();
    }
});

export default router;