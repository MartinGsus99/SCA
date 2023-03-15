import React, { Component } from 'react';
import { Card, Row, Form, Button, Input, DatePicker, Select } from 'antd';

class Filter extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    render() {
        const { RangePicker } = DatePicker;
        const { Option } = Select;
        const onChange = function () {

        };
        const { queryKeys,searchInfor } = this.props;
        return (
            <Row>
                <Card>
                    <Form layout={'inline'}>
                        {
                            queryKeys.map((item) => {
                                if (item.type == 'string') {
                                    return <Form.Item label={item.label} field={item.key} key={item.key}>
                                        <Input placeholder={item.placeholder}></Input>
                                    </Form.Item>
                                }
                                if (item.type == 'select') {
                                    return <Form.Item label={item.label} field={item.key} key={item.key} >
                                        <Select
                                        style={{width:180}}
                                            defaultValue={item.options[0].value}
                                            onChange={onchange}
                                        >
                                            {
                                                item.options.map((option) => {
                                                    return <Option
                                                        value={option.value} key={option.label}>{option.label}</Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                }
                                if (item.type == 'daterange') {
                                    return <Form.Item label={item.label} field={item.key} key={item.key}>
                                        <RangePicker onChange={onChange} />
                                    </Form.Item>
                                }
                            })
                        }
                        <Form.Item >
                            <Button type="primary" onClick={searchInfor}>查找</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        );
    }
}

export default Filter;