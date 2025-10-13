import { BASE_URL } from "../config/constants"

export async function getAllBooks() {
    return fetch(`${BASE_URL}/v1/books`)
        .then((response) => {
            if (response.ok) {
                return response.json()
            }
            throw response
        })
}