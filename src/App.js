import React from 'react'
import { Route, Link } from 'cans/router'
import 'antd/dist/antd.css'

import {
  Layout,
  Menu
} from 'antd'

import Home from './views/Home'
import Curd from './views/Curd'

const Header = Layout.Header
const Content = Layout.Content

const App = () => {
  return (
    <div>
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to='/curd'>CURD</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
      <Content style={{ padding: '10px 50px' }}>
        <Route exact path='/' component={Home} />
        <Route path='/curd' component={Curd} />
      </Content>
    </div>
  )
}

export default App
