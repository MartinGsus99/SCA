import React, { Component } from 'react';
import { Table, Tag, Card, Row, Form, Button, Radio, Input } from 'antd';
import { func } from 'prop-types';


class Filter extends Component {
    constructor(props) {
        super(props);

    }

    state = {
        formLayout: 'inline',
        formItems: null,
    }

    generateItems = () => {
        console.log(this.props.queryKeys);
        const querykeys = this.props.queryKeys;

        let items= querykeys.map((item) => {
            return (
                <Form.item key={item.key} label={item.label} >
                    <Input placeholder={item.placeholder}></Input>
                </Form.item>
            )
        });
       return items;
    }

    componentWillMount() {
        let formItems = this.generateItems();
        this.setState({
            formItems,
        });
    }

    render() {
        let {list}=this.props.queryKeys;

        return (
            <Row>
                <Card>
                    <Form layout={this.state.formLayout}>
                       {this.state.formLayout}
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