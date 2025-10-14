import axios from "axios"
import "../config/axios.js"

export async function getAllBooks() {
    const response = await axios.get("/v1/books")
    return response.data
}