const on = jest.fn()

const createForm = jest.fn(
  () =>
    new Promise((resolve) =>
      resolve({
        on
      })
    )
)

Object.defineProperty(window, 'Formio', {
  writable: true,
  value: {
    createForm
  }
})

export {}
