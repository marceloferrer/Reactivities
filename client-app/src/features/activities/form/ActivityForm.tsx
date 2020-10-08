import React from 'react'
import { Form, Segment } from 'semantic-ui-react'

export const ActivityForm = () => {
    return (
        <div>
            <Segment>
                <Form>
                    <Form.Input placeholder='Title'/>
                    <Form.TextArea rows={2} placeholder='Description'/>
                    <Form.Input placeholder='Category'/>
                    <Form.Input type='date' placeholder='Date'/>
                    <Form.Input placeholder='City'/>
                    <Form.Input placeholder='Venue'/>
                </Form>
            </Segment>
        </div>
    )
}

export default ActivityForm