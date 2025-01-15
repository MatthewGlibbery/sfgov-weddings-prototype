// A page to provide a well-known URL that throws an error

export default function IntentionalErrorPage() {
  throw new Error('Whoops!')
}
