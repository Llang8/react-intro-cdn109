import { useEffect, useState, useContext } from "react";
import Post from '../components/Post'
import { DataContext } from '../contexts/DataProvider'

export default function Home() {
    const { posts } = useContext(DataContext)
    return (
        <div>
            <h1>Home</h1>
            { posts.map((post) => <Post post={post} key={post.id} />) }
        </div>
    )
}