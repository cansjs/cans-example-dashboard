import React from 'react'
import { inject } from 'cans'
import {
  Table,
  Button
} from 'antd'

const DataTable = inject(({ models }) => {
  const columns = [
    {
      title: 'id',
      dataIndex: 'id'
    },
    {
      title: 'title',
      dataIndex: 'title'
    },
    {
      title: 'body',
      dataIndex: 'body'
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
        loading={models.rest.posts.loading.index}
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
