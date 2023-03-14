import { useEffect, useState } from "react";
import Post from '../components/Post'

export default function Home() {
    const [posts, setPosts] = useState([])
    console.log(posts)
    useEffect(() => {
        async function getPosts() {
            const response = await fetch('https://cdn109-fakebook.onrender.com/api/posts')
            const data = await response.json()
            setPosts(data)
        }
        getPosts()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            { posts.map((post) => <Post post={post} key={post.id} />) }
        </div>
    )
}