import { render, screen } from '@testing-library/react'
import App from './App.jsx'

describe('App', () => {
  it('renders navigation brand and key sections', () => {
    render(<App />)
    // Brand link
    expect(screen.getByRole('link', { name: /Portfolio/i })).toBeInTheDocument()
    // Titles should be in the DOM regardless of animation state
    expect(screen.getByRole('heading', { name: /How I Work/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Projects/i, level: 2 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Skills/i, level: 2 })).toBeInTheDocument()
  })
})
