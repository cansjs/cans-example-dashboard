import cans from 'cans'
import React from 'react'
import { BrowserRouter } from 'cans/router'
import App from './App'

const app = cans()

app.route(() => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
))

app.start(document.querySelector('#root'))
