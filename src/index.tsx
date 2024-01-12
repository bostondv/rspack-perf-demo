import React from 'react'
import { hydrateRoot } from 'react-dom/client'

const container = document.getElementById('js-app')

if (container) {
  hydrateRoot(container, <App />)
}

function App() {
  return (
    <>
      <h1>Hello, world!</h1>
    </>
  )
}
