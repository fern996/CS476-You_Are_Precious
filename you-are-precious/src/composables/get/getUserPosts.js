import { ref } from 'vue'
import { projectFirestore } from '../../firebase/config'

const getUserPosts = (uid) => {
    console.log('123')
    const posts = ref([])
    const error = ref(null)
    console.log('this is getposts')
    const load = async() => {
        try {
            const res = await projectFirestore.collection('verifiedPost')
                .where("author.ownerId", "==", uid)
                //
                //.where("visible", "==", "true")
                .orderBy('createdAt', 'desc')
                .get()

            posts.value = res.docs.map(doc => {
                return {...doc.data(), id: doc.id }
            })
        } catch (err) {
            error.value = err.message
        }
    }

    return { posts, error, load }
}

export default getUserPosts