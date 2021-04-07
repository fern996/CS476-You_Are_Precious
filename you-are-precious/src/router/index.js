import { createRouter, createWebHistory } from 'vue-router'
import { requireNoAuth, requireAuth } from '../composables/routeguard/routeguard'
//import Home from '../views/Home.vue'
import CreatePost from '../views/createPost/CreatePost.vue'
import Abuse from '../views/abuse/Abuse.vue'
import Welcome from '../views/welcome/Welcome.vue'
import MentalHealth from '../views/mentalHealth/MentalHealth.vue'
import Signup from '../views/signup/Signup.vue'
import Login from '../views/login/Login.vue'
import Home from '../views/home/Home.vue'
import AllPosts from '../views/allPosts/AllPosts.vue'
import Profile from '../views/profile/Profile.vue'
import Settings from '../views/settings/Settings.vue'
import About from '../views/about/About.vue'
import TermsAndConditions from '../views/termsandconditions/TermsAndConditions.vue'
import Faq from '../views/faq/Faq.vue'
import Suicidal from '../views/suicidal/Suicidal.vue'
import GetHelp from '../views/getHelp/GetHelp.vue'

const routes = [{
        path: '/',
        name: 'Welcome',
        component: Home
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/terms-and-conditions',
        name: 'TermsAndConditions',
        component: TermsAndConditions
    },
    {
        path: '/faq',
        name: 'Faq',
        component: Faq
    },
    {
        path: '/signup/:settings',
        name: 'Signup',
        component: Signup,
        beforeEnter: requireNoAuth
    },
    {
        path: '/login/:view',
        name: 'Login',
        component: Login,
        beforeEnter: requireNoAuth
    },
    {
        path: '/profile/:profileView',
        name: 'Profile',
        component: Profile,
        beforeEnter: requireAuth
    },
    {
        path: '/create-post',
        name: 'CreatePost',
        component: CreatePost
    },
    {
        path: '/abuse/:view',
        name: 'Abuse',
        component: Abuse
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },
    {
        path: '/Suicidal/:view',
        name: 'Suicidal',
        component: Suicidal
    },
    {
        path: '/getHelp',
        name: 'GetHelp',
        component: GetHelp
    },
    {
        path: '/allPosts/:view',
        name: 'AllPosts',
        component: AllPosts
    },
    {
        path: '/mentalHealth/:view',
        name: 'MentalHealth',
        component: MentalHealth
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router