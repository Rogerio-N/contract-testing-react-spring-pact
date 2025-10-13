import { getAllBooks } from '../services/BookService'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])

    useEffect(() => {
        getAllBooks().then((data) => {
            setBooks(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Books</h1>
                {isLoading ? (
                    <p>Carregando</p>
                ) : (
                    <ul>
                        {books.map((book) => (
                            <li key={book.id}>{book.title}</li>
                        ))}
                    </ul>
                )}
            </header>
        </div>
    )
}

export default App
