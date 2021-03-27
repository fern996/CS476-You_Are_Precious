import { projectAuth } from '../../firebase/config'



// auth guards
const requireAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    console.log('current user in auth guard: ', user)
    if (!user) {
        next({ name: 'LogIn' })
    } else {
        next()
    }
}


const requireNoAuth = (to, from, next) => {
    let user = projectAuth.currentUser
    if (user) {
        next({ name: 'Welcome' })
    } else {
        next()
    }
}

export { requireNoAuth }