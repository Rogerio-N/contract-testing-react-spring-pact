import './App.css'
import { useEffect, useState } from 'react'

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [books, setBooks] = useState([])
    const baseUrl = 'http://localhost:8080'

    useEffect(() => {
        fetch(`${baseUrl}/v1/books`)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                throw response
            })
            .then((data) => {
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
