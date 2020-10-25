import React, { useState, FormEvent, useContext } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';

interface IProps {
    setEditMode: (editMode: boolean) => void;
    activity: IActivity;
    editActivity: (activity: IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({
    setEditMode, 
    activity: initialFormState,
    editActivity,
    submitting
}) => {
    const activityStore = useContext(ActivityStore);
    const {createActivity} = activityStore;

    const initializeForm = () => {
        if (initialFormState) {
            return initialFormState;
        }
        else{
            return {
                id: '',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '',
                venue: ''
            };
        }
    }

    const [activity, setActivity] = useState<IActivity>(initializeForm);
    
    const handleSubmit= () => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else{
            editActivity(activity);
        }
    }

    const handleInputChange = (
        event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
        const {name, value} = event.currentTarget;
        setActivity({ ...activity, [name]: value });
    }

    return (
        <div>
            <Segment clearing>
                <Form onSubmit={handleSubmit}>
                    <Form.Input onChange={handleInputChange} name='title' placeholder='Title' value={activity.title}/>
                    <Form.TextArea rows={2} onChange={handleInputChange} name='description'  placeholder='Description' value={activity.description}/>
                    <Form.Input onChange={handleInputChange} name='category'  placeholder='Category' value={activity.category}/>
                    <Form.Input onChange={handleInputChange} name='date'  type='datetime-local' placeholder='Date' value={activity.date}/>
                    <Form.Input onChange={handleInputChange} name='city'  placeholder='City' value={activity.city}/>
                    <Form.Input onChange={handleInputChange} name='venue'  placeholder='Venue' value={activity.venue}/>
                    <Button loading={submitting} floated='right' positive type='submit' content='Submit'></Button>
                    <Button onClick={() => setEditMode(false)} floated='right' type='button' content='Cancel'></Button>
                </Form>
            </Segment>
        </div>
    );
};

export default observer(ActivityForm);