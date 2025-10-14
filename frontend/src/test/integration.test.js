import path from 'path'
import { getAllBooks } from '../services/BookService.js'
import { Pact, Matchers, SpecificationVersion } from '@pact-foundation/pact'
import axios from 'axios'

describe('GET /v1/books', () => {
    const provider = new Pact({
        consumer: 'booksConsumer',
        provider: 'booksProvider',
        dir: path.resolve(process.cwd(), 'src', 'test', 'pacts'),
        spec: SpecificationVersion.SPECIFICATION_VERSION_V4,
    })

    it('Status 200 and list books with all fields filled', async () => {
        const booksExpectation = {
            id: 1,
            title: 'Title',
            author: 'Author',
            description: 'Description',
            createdAt: '2025-01-01T00:00:00',
            updatedAt: '2025-01-01T00:00:00',
        }
        await provider
            .addInteraction()
            .uponReceiving('a request to list all books with all fields filled')
            .withRequest('GET', '/v1/books')
            .willRespondWith(200, (builder) => {
                builder.jsonBody(Matchers.eachLike(booksExpectation))
            })
            .executeTest(async (server) => {
                axios.defaults.baseURL = server.url
                return getAllBooks().then((res) => {
                    expect(res).toEqual(Array.of(booksExpectation))
                })
            })
    })

    it('Status 200 and list books with only required fields filled', async () => {
        const booksExpectation = {
            id: 1,
            title: 'Title',
            author: 'Author',
            description: null,
            createdAt: '2025-01-01T00:00:00',
            updatedAt: '2025-01-01T00:00:00',
        }
        await provider
            .addInteraction()
            .uponReceiving(
                'a request to list all books with only required fields filled'
            )
            .withRequest('GET', '/v1/books')
            .willRespondWith(200, (builder) => {
                builder.jsonBody(Matchers.eachLike(booksExpectation))
            })
            .executeTest(async (server) => {
                axios.defaults.baseURL = server.url
                return getAllBooks().then((res) => {
                    expect(res).toEqual(Array.of(booksExpectation))
                })
            })
    })
})
