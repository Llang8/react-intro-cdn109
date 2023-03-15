import { useState, useEffect, createContext, useContext } from 'react'

export const DataContext = createContext()

export const DataProvider = function(props) {
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

    async function getPost(id) {
        const response = await fetch(`https://cdn109-fakebook.onrender.com/api/post/${id}`)
        const data = await response.json()
        return data
    }
    
    async function getPokemonData(pokemonId) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        const data = await response.json()
        return data
    } 

    const value = {
        // title: title is equivalent to:
        posts,
        getPost,
        getPokemonData
    }

    return (
        <DataContext.Provider value={value}>
            { props.children }
        </DataContext.Provider>
    )
}