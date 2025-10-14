import path from 'path'
import { getAllBooks } from '../src/services/BookService.js'
import { Pact, Matchers, SpecificationVersion } from '@pact-foundation/pact'
import axios from 'axios'
import { integer, string } from '@pact-foundation/pact/src/dsl/matchers.js'
import { nullValue, time } from '@pact-foundation/pact/src/v3/matchers.js'

describe('GET /v1/books', () => {
    const provider = new Pact({
        consumer: 'booksConsumer',
        provider: 'booksProvider',
        port: 1234,
        dir: path.resolve(process.cwd(), 'test', 'pacts'),
        spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
    })
    
    it('Status 200 and list books with all fields filled', async () => {
        const booksExpectation = {
            id: integer(),
            title: string(),
            author: string(),
            description: string(),
            createdAt: time("yyyy-MM-dd'T'HH:mm:ss", "2025-10-10T15:00:00"),
            updatedAt: time("yyyy-MM-dd'T'HH:mm:ss", "2025-10-10T15:00:00")
        }
        await provider
            .addInteraction()
            .uponReceiving('a request to list all books with all fields filled')
            .withRequest('GET', '/v1/books')
            .willRespondWith(200, (builder) => {
                builder.jsonBody(Matchers.eachLike(booksExpectation))
            })
            .executeTest(async (server) => {
                axios.defaults.baseURL=server.url
                return getAllBooks().then(res => {
                    console.log(res)
                })
            })
    })

    it('Status 200 and list books with only required fields filled', async () => {
        const booksExpectation = {
            id: integer(),
            title: string(),
            author: string(),
            description: nullValue(),
            createdAt: time("yyyy-MM-dd'T'HH:mm:ss", "2025-10-10T15:00:00"),
            updatedAt: time("yyyy-MM-dd'T'HH:mm:ss", "2025-10-10T15:00:00")
        }
        await provider
            .addInteraction()
            .uponReceiving('a request to list all books with only required fields filled')
            .withRequest('GET', '/v1/books')
            .willRespondWith(200, (builder) => {
                builder.jsonBody(Matchers.eachLike(booksExpectation))
            })
            .executeTest(async (server) => {
                axios.defaults.baseURL=server.url
                return getAllBooks().then(res => {
                    console.log(res)
                })
            })
    })
})
