import React, { Component } from 'react'
import { useState } from 'react'
import {
    Form, Input,
    Button,
    Radio,
    Select,
    DatePicker,
} from 'antd'
const { RangePicker } = DatePicker
const { Option } = Select

function DynamicFilter (props) {
    const [formData, setFormData] = useState()

    const onChange = (value, dateString) => {
        console.log('Selected Time: ', value)
        console.log('Formatted Selected Time: ', dateString)
    }
    const onOk = (value) => {
        console.log('onOk: ', value)
    }

    const getOptionList = (data, name) => {
        if (!data) {
            return []
        }
        const options = []
        data.map(item => {
            options.push(
                <Option value={item.value} key={item.value}>
                    {item.label}
                </Option>
            )
        })
        return options
    }

    const initFilterForm = () => {
        const [...formList] = props.formList
        const formKeys = props.queryKeys
        console.log('formKeys', formKeys['kind'])
        const formItemList = []
        if (formList.length > 0) {
            formList.map((item) => {
                if (item.type == 'input') {
                    const inputItem = (
                        <Form.Item key={item.key} label={item.label} name={item.key} value={formKeys[item.key]}>
                            <Input></Input>
                        </Form.Item >
                    )
                    formItemList.push(inputItem)
                } else if (item.type == 'select') {
                    const selectItem = (
                        <Form.Item key={item.key} label={item.label} name={item.key} >
                            <Select placeholder={item.placeholder} style={{ width: 160 }}>
                                {
                                    getOptionList(item.options)
                                }
                            </Select>
                        </Form.Item>
                    )
                    formItemList.push(selectItem)
                } else if (item.type == 'daterange') {
                    const datePicker = (

                        <Form.Item key={item.key} label={item.label} name={item.key}>
                            <RangePicker
                                showTime={{
                                    format: 'HH:mm',
                                }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onChange}
                                onOk={onOk}
                            ></RangePicker>
                        </Form.Item>

                    )
                    formItemList.push(datePicker)
                }
            })
        }
        return formItemList
    }

    const handleSubmit = (values) => {
        props.search
    }

    return (
        <Form layout='inline'>
            {
                initFilterForm()
            }
            <Form.Item>
                <Button type="primary" onClick={props.search} style={{ margin: '0 20px' }}>查询</Button>
                <Button type="primary" onClick={props.resetFilter}>清空</Button>
            </Form.Item>
        </Form>
    )
}
export default DynamicFilter