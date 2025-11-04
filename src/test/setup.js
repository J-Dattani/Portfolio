import '@testing-library/jest-dom'

// Mock IntersectionObserver for Framer Motion's whileInView in JSDOM
class MockIntersectionObserver {
	constructor(callback) {
		this.callback = callback
	}
	observe() {}
	unobserve() {}
	disconnect() {}
}

if (!global.IntersectionObserver) {
	global.IntersectionObserver = MockIntersectionObserver
}

