import React, { Component } from 'react';
import {
    Form, Input,
    Button,
    Radio,
    Select,
    DatePicker,
} from 'antd';

const { RangePicker } = DatePicker;
const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
};
const onOk = (value) => {
    console.log('onOk: ', value);
};

const { Option } = Select;
class DynamicFilter extends Component {
    constructor(props) {
        super(props);
    }
    state = {

    }

    getOptionList(data, name) {
        if (!data) {
            return [];
        }
        const options = [];
        data.map(item => {
            options.push(
                <Option value={item.value} key={item.value}>
                    {item.label}
                </Option>
            );
        });
        return options;
    }

    initFilterForm = () => {
        const { formList } = this.props;
        const formItemList = [];
        if (formList.length > 0) {
            formList.map((item) => {
                if (item.type == 'input') {
                    const inputItem = (
                        <Form.Item key={item.key} label={item.label} name={item.key} >
                          
                        </Form.Item>
                    )
                    formItemList.push(inputItem);
                } else if (item.type == 'select') {
                    const selectItem = (
                        <Form.Item key={item.key} label={item.label} name={item.key} >
                            <Select placeholder={item.placeholder} style={{ width: 160 }}>
                                {
                                    this.getOptionList(item.options)
                                }
                            </Select>
                        </Form.Item>
                    )
                    formItemList.push(selectItem);
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
                    formItemList.push(datePicker);
                }
            })
        }
        return formItemList;
    }

    printPropsData = () => {
        const queryKeys = this.props.queryKeys;
        console.log(queryKeys);
    }

    render() {
        return (
            <Form layout='inline'>
                {
                    this.initFilterForm()
                }
                <Form.Item>
                    <Button type="primary" onClick={this.printPropsData} style={{ margin: '0 20px' }}>查询</Button>
                    <Button type="primary" onClick={this.reset}>清空</Button>
                </Form.Item>
            </Form>
        );
    }
}

export default DynamicFilter;