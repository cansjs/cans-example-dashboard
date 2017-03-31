import React from 'react'
import { inject } from 'cans'
import {
  Table,
  Button,
  message,
  Modal,
  Form,
  Input
} from 'antd'

const PAGE_SIZE = 10

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
        const edit = () => {
          models.modals.post.show(post)
        }
        return (
          <span>
            <a onClick={edit}>Edit</a>
            <span className="ant-divider" />
            <a onClick={del}>Delete</a>
            <span className="ant-divider" />
          </span>
        )
      }
    }
  ]

  const onTableChange = (pagination) => {
    const pageSize = pagination.pageSize
    const page = pagination.current

    models.rest.posts.index({ params: { _page: page, _limit: pageSize } })
  }

  return (
    <div>
      <Table
        rowKey='id'
        loading={models.rest.posts.loading.index || models.rest.posts.loading.delete}
        columns={columns}
        onChange={onTableChange}
        pagination={{ total: models.rest.posts.pagination.total, pageSize: PAGE_SIZE }}
        dataSource={models.rest.posts.data.index}
      />
    </div>
  )
})

const CreatePostModal = Form.create()(inject(({ models, form }) => {
  const { getFieldDecorator, validateFields, resetFields } = form
  const create = () => { 
    validateFields(async (err, values) => {
      if (!err) {
        models.modals.post.startLoading()
        try {
          if (models.modals.post.record.id) {
            await models.rest.posts.update(models.modals.post.record.id, values)
          } else {
            await models.rest.posts.create(values)
          }
          models.modals.post.hide()
          resetFields()
          message.success('success')
        } catch (e) {
          message.error(e.message)
        } finally {
          models.modals.post.stopLoading()
        }
      }
    })
  }
  return (
    <Modal
      title={models.modals.post.title}
      visible={models.modals.post.visible}
      onOk={create}
      onCancel={models.modals.post.hide}
      confirmLoading={models.modals.post.confirmLoading}
    >
      <Form>
        <Form.Item label='title'>
          {getFieldDecorator('title', { initialValue: models.modals.post.record.title , rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label='body'>
          {getFieldDecorator('body', { initialValue: models.modals.post.record.body })(
            <Input type='textarea' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}))

const Curd = inject(({ models }) => {
  const fetch = () => { models.rest.posts.index({ params: { _page: 1, _limit: PAGE_SIZE } }) }
  return (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <Button
          style={{ marginRight: '1em' }}
          loading={models.rest.posts.loading.index}
          onClick={fetch}
        >Fetch Posts</Button>
        <Button
          type='primary'
          style={{ marginRight: '1em' }}
          onClick={models.modals.post.show}
        >New Post</Button>
      </div>
      <CreatePostModal />
      <DataTable />
    </div>
  )
})

export default Curd
