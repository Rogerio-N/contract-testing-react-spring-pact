/**
 * @jest-environment jsdom
*/

import { render, screen } from '@testing-library/react'
import App from '../app/App.js'

test('renders learn react link', () => {
    render(<App />)
    const linkElement = screen.getByText(/Books/i)
    expect(linkElement).toBeInTheDocument
})
