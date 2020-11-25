import React, { useState, useContext, useEffect } from 'react';
import { Button, Form, Grid, GridColumn, Segment } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import { TextInput } from '../../../app/common/form/TextInput';
import { TextAreaInput } from '../../../app/common/form/TextAreaInput';
import { SelectInput } from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { combineDateAndTime } from '../../../app/common/util/util';
import {combineValidators, hasLengthGreaterThan, isRequired} from 'revalidate'

const validate = combineValidators({
    title: isRequired({message: 'Event title is required'}),
    category: isRequired({message: 'Event category is required'}),
    description: hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'}),
    city: isRequired({message: 'Event city is required'}),
    venue: isRequired({message: 'Event venue is required'}),
    date: isRequired({message: 'Event date is required'}),
    time: isRequired({message: 'Event time is required'}),
});

interface DetailParams {
    id:string;
}

export const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {
        createActivity, 
        editActivity, 
        submitting, 
        loadActivity
    } = activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (match.params.id) {
            setLoading(true);
            loadActivity(match.params.id).then(
                (activity) =>  setActivity(new ActivityFormValues(activity)))
                .finally(() => setLoading(false));
        }
    }, [
        loadActivity, 
        match.params.id
    ]);

    const handleFinalFormSubmit = (values : any) => {
        const dateAndTime = combineDateAndTime(values.date, values.time);
        //Remove date and time property
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        if (!activity.id) {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity);
        }
        else{
            editActivity(activity);
        }
    };

    return (
        <Grid>
            <GridColumn width={10}>
            <div>
            <Segment clearing>
                <FinalForm 
                validate={validate}
                initialValues={activity}
                    onSubmit={handleFinalFormSubmit} 
                    render={({handleSubmit, invalid, pristine}) => (
                        <Form onSubmit={handleSubmit} loading={loading}>
                        <Field name='title' placeholder='Title' value={activity.title} component={TextInput}/>
                        <Field name='description' row={3} placeholder='Description' value={activity.description} component={TextAreaInput}/>
                        <Field name='category'  placeholder='Category' value={activity.category} component={SelectInput} options={category}/>
                        <Form.Group widths='equal'>
                            <Field component={DateInput} name='date' placeholder='Date' value={activity.date} date={true}/>
                            <Field component={DateInput} name='time' placeholder='Time' value={activity.time} time={true}/>
                        </Form.Group>
                        <Field component={TextInput} name='city'  placeholder='City' value={activity.city}/>
                        <Field component={TextInput} name='venue'  placeholder='Venue' value={activity.venue}/>
                        <Button 
                            loading={submitting} 
                            disabled={loading || invalid || pristine} 
                            floated='right' 
                            positive 
                            type='submit' 
                            content='Submit'>
                        </Button>
                        <Button 
                            onClick={activity.id ? () => history.push(`/activities/${activity.id}`) : () => history.push('/activities')}
                            disabled={loading} 
                            floated='right' 
                            type='button' 
                            content='Cancel'>
                        </Button>
                    </Form>
                    )}
                >
                </FinalForm>
            </Segment>
        </div>
            </GridColumn>
        </Grid>
    );
};

export default observer(ActivityForm);