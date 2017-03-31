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
      <Table
        rowKey='id'
        loading={models.rest.posts.loading.index || models.rest.posts.loading.delete}
        columns={columns}
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
        models.modals.createPost.startLoading()
        try {
          await models.rest.posts.create(values)
          models.modals.createPost.hide()
          resetFields()
          message.success('success')
        } catch (e) {
          message.error(e.message)
        } finally {
          models.modals.createPost.stopLoading()
        }
      }
    })
  }
  return (
    <Modal
      title='New Post'
      visible={models.modals.createPost.visible}
      onOk={create}
      onCancel={models.modals.createPost.hide}
      confirmLoading={models.modals.createPost.confirmLoading}
    >
      <Form>
        <Form.Item label='title'>
          {getFieldDecorator('title', { rules: [{ required: true }] })(
            <Input />
          )}
        </Form.Item>
        <Form.Item label='body'>
          {getFieldDecorator('body')(
            <Input type='textarea' />
          )}
        </Form.Item>
      </Form>
    </Modal>
  )
}))

const Curd = inject(({ models }) => {
  return (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <Button
          style={{ marginRight: '1em' }}
          loading={models.rest.posts.loading.index}
          onClick={models.rest.posts.index}
        >Fetch Posts</Button>
        <Button
          type='primary'
          style={{ marginRight: '1em' }}
          onClick={models.modals.createPost.show}
        >New Post</Button>
      </div>
      <CreatePostModal />
      <DataTable />
    </div>
  )
})

export default Curd
