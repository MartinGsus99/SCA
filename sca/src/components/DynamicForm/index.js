import React, { Component } from 'react';
import {
    Form,
    Input,
    Select,
    Button,
    Upload
} from 'antd';
import { useState } from 'react';
import { func } from 'prop-types';
import { UploadOutlined } from '@ant-design/icons';

class DynamicForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        const { formItems, taskform } = this.props;

        var onchange = () => {
            console.log(1);
        };

        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 13,
            },
        };
        const fileprops = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
        }
        const { Option } = Select;

        return (
            <Form {...layout} form={taskform}>
                {
                    formItems.map((item) => {
                        if (item.type == 'string') {
                            return <Form.Item label={item.label}
                                key={item.key} rules={item.rules}>

                                <Input placeholder={item.placeholder} ></Input>
                            </Form.Item>

                        }
                        if (item.type == 'select') {
                            return <Form.Item label={item.label} key={item.key}>
                                <Select
                                    defaultValue={item.options[0].value}
                                    onChange={onchange}
                                >
                                    {
                                        item.options.map((option)=>{
                                            return <Option 
                                            value={option.value} key={option.label}>{option.label}</Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        }
                        if (item.type == 'cron') {
                            return <Form.Item label={item.label} key={item.key}>
                                <Input placeholder={item.placeholder}></Input>
                            </Form.Item>
                        }
                        if (item.type == 'upload') {
                            return <Form.Item label={item.label} key={item.key}>
                                <Upload {...fileprops}>
                                    <Button>+</Button>
                                </Upload>
                            </Form.Item>
                        }
                    })
                }
            </Form>
        );
    }
}

export default DynamicForm;