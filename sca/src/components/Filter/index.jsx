import React, { Component } from 'react';
import { Table, Tag, Card, Row, Form, Button, Radio, Input } from 'antd';
import { func } from 'prop-types';


class Filter extends Component {
    constructor(props) {
        super(props);
      
    }

    componentWillMount() {
        
    }

    render() {
        const { queryKeys } = this.props;
        return (
            <Row>
                <Card>
                    <Form layout={'inline'}>
                        {
                            queryKeys.map((item)=>{
                                return  <Form.Item label={item.label} field={item.key} key={item.key}>
                                <Input placeholder={item.placeholder}></Input>
                            </Form.Item>
                            })
                        }
                        <Form.Item >
                            <Button type="primary">查找</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Row>
        );
    }
}

export default Filter;