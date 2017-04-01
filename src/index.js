import cans from 'cans'
import { useStrict } from 'cans/mobx'
import React from 'react'
import { BrowserRouter } from 'cans/router'
import App from './App'

useStrict(true)

// cans plugins
import { restPlugin } from 'cans-plugin-http'
import modalStorePlugin from 'cans-plugin-modal-store'

const app = cans()

app.use(restPlugin, {
  resources: [
    { name: 'posts', url: 'http://jsonplaceholder.typicode.com', total: (res) => res.headers['x-total-count'] }
  ]
})

app.use(modalStorePlugin, {
  modals: [
    { name: 'post', title: (record) => record.id ? 'Edit post' : 'New post' }
  ]
})

app.route(() => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
))

app.start(document.querySelector('#root'))
