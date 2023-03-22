import React, { Component } from 'react';
import {
    Form, Input,
    Button,
    Radio,
    Select,
} from 'antd';
class DynamicFilter extends Component {
    constructor(props) {
        super(props);
    }
    state = {}

    initFilterForm() {
        const { formList } = this.props.formList;
        const formItemList = [];
        if(formList.length>0){
            formList.map((item) => {
                if (item.type == 'input') {
                    const inputItem = (
                        <Form.Item label={item.label} name={item.key} >
                           <Input></Input>
                        </Form.Item>
                    )
                    formItemList.push(inputItem);
                }
            })
        }


        return formItemList;

    }


    render() {
        return (
            <Form>
              
            </Form>
        );
    }
}

export default DynamicFilter;