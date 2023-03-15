import { useState, useEffect, createContext, useContext } from 'react'
import { getFirestore, getDocs, collection, doc, getDoc } from '@firebase/firestore'

export const DataContext = createContext()

export const DataProvider = function(props) {
    const [posts, setPosts] = useState([])
    const db = getFirestore()
    console.log(posts)
    useEffect(() => {
        async function getPosts() {
            const querySnapshot = await getDocs(collection(db, 'posts'))
            const loadedPosts = []
            querySnapshot.forEach((doc) => {
                loadedPosts.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setPosts(loadedPosts)
        }
        getPosts()
    }, [])

    async function getPost(id) {
        // Get a reference to our document
        const docRef = doc(db, 'posts', id)

        // Get a snapshot of information based on our reference
        const docSnap = await getDoc(docRef)

        if (!docSnap.exists()) {
            // Throw an error, so that the catch is triggered in PostSingle
            throw new Error
        }
        
        return docSnap.data()
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