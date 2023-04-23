import React, { Component } from 'react'
import { Tabs, Card } from 'antd'

class DynamicTabs extends Component {
    constructor(props) {
        super(props)
    }
    state = {

    }

    onChange = (key) => {
        console.log(key)
    };

    render () {
        return (
            <Card>
                <Tabs defaultActiveKey={'3'} items={this.props.items} onChange={this.onChange} >
                    {
                        this.props.items.map((item) => {
                            return (
                                <Tabs.TabPane key={item.key} tab={item.label}>{item.children}</Tabs.TabPane>
                            )

                        })
                    }
                </Tabs>
            </Card>
        )
    }
    0
}

export default DynamicTabs