import React, { Component } from 'react';
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Option,
    Switch,
    TreeSelect,
} from 'antd';
import { useState } from 'react';
import { func } from 'prop-types';

class DynamicForm extends Component {
    constructor(props) {
        super(props);
    }
    state = {}
    render() {
        const { formItems } = this.props;

        var onchange=()=>{
            console.log(1);
        };
        return (
            <Form>
                {
                    formItems.map((item) => {
                        if (item.type == 'string') {
                            return <Form.Item label={item.label} field={item.key} key={item.key}>
                                <Input placeholder={item.placeholder} rules></Input>
                            </Form.Item>
                        }
                        if (item.type == 'select') {
                            return <Form.Item label={item.label} field={item.key} key={item.key}>
                                <Select
                                    onChange={onchange}
                                >
                                   
                                </Select>
                            </Form.Item>
                        }
                    })
                }
            </Form>
        );
    }
}

export default DynamicForm;