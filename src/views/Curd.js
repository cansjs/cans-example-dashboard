import React from 'react'
import { inject } from 'cans'
import {
  Table,
  Button,
  message
} from 'antd'

const DataTable = inject(({ models }) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: 'title',
      dataIndex: 'title',
      width: 300
    },
    {
      title: 'body',
      dataIndex: 'body'
    },
    {
      title: 'operations',
      render (value, post) {
        const del = async () => {
          try {
            await models.rest.posts.delete(post.id)
            message.success('success')
          } catch (e) {
            message.error(e.message)
          }
        }
        return (
          <span>
            <a href="#">Edit</a>
            <span className="ant-divider" />
            <a onClick={del}>Delete</a>
            <span className="ant-divider" />
          </span>
        )
      }
    }
  ]

  return (
    <div>
      <Button
        style={{ marginBottom: '1em' }}
        loading={models.rest.posts.loading.index}
        onClick={models.rest.posts.index}
      >
        Fetch Posts
      </Button>
      <Table
        rowKey='id'
        loading={models.rest.posts.loading.index || models.rest.posts.loading.delete}
        columns={columns}
        dataSource={models.rest.posts.data.index}
      />
    </div>
  )
})

const Curd = () => {
  return (
    <div>
      <DataTable />
    </div>
  )
}

export default Curd
