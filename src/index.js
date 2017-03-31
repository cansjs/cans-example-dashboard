import cans from 'cans'
import React from 'react'
import { BrowserRouter } from 'cans/router'
import App from './App'

// cans plugins
import { restPlugin } from 'cans-plugin-http'
import modalStorePlugin from 'cans-plugin-modal-store'

const app = cans()

app.use(restPlugin, {
  resources: [
    { name: 'posts', url: 'http://jsonplaceholder.typicode.com' }
  ]
})

app.use(modalStorePlugin, {
  names: ['createPost']
})

app.route(() => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
))

app.start(document.querySelector('#root'))
