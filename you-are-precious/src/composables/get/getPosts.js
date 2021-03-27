import { ref } from 'vue'
import { projectFirestore } from '../../firebase/config'

const getPosts = (type) => {

    const posts = ref([])
    const error = ref(null)

    const load = async() => {
        try {
            const res = await projectFirestore.collection('verifiedPost')
                .where("post.type", "==", type)
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

export default getPosts