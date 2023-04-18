import React from 'react'
import { Form, Button, Row, Col, Input } from 'antd'

const DynamicFilter = Form.create({ name: 'query_form' })(
  ({ form, formItems, onSearch }) => {
    const handleSearch = e => {
      e.preventDefault()
      form.validateFields((err, values) => {
        if (!err) {
          onSearch(values)
        }
      })
    }

    const handleReset = () => {
      form.resetFields()
    }

    const { getFieldDecorator } = form

    return (
      <Form layout='inline' onSubmit={handleSearch}>
        {formItems.map(item => (
          <Form.Item label={item.label} span={4} key={item.name}>
            {getFieldDecorator(item.name, {
              rules: [{ required: item.required, message: item.message }],
            })(item.component || <Input />)}
          </Form.Item>
        ))}

        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button onClick={handleReset} style={{ marginLeft: 8 }}>
          重置
        </Button>
      </Form>
    )
  }
)

export default DynamicFilter
