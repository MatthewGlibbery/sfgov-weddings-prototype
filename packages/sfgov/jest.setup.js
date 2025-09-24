// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import expect from 'expect'
import fetchMock from 'jest-fetch-mock'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.development.example' })

fetchMock.enableMocks()

expect.extend({
  toStringifyTo(received, expected) {
    return {
      pass: String(received) === expected,
      message() {
        return `String value "${received}" !== "${expected}"`
      }
    }
  }
})

// set up DOM element for ReactModal
// because feedback modal is added to PageWrapper and
// all page components use it
let root = document.getElementById('__next')
if (!root) {
  root = document.createElement('div')
  root.id = '__next'
  document.body.appendChild(root)
}
