import { ref } from 'vue'
import { projectFirestore } from '../../firebase/config'

const getAllPosts = () => {

    const posts = ref([])
    const error = ref(null)
    console.log('this is get all posts')
    const load = async() => {
        try {
            const res = await projectFirestore.collection('verifiedPost')
                //.where("post.type", "==", "abuse")
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

export default getAllPosts