import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react'
import { Item, Label, Segment } from 'semantic-ui-react'
import ActivityStore from '../../../app/stores/activityStore'
import { ActivityListItem } from './ActivityListItem';

export const ActivityList: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    const {activitiesByDate} = activityStore;

    return (
        <Fragment>
            {activitiesByDate.map(([group, activities]) => (
                <Fragment key={group}>
                    <Label key={group} size='large' color='blue'>
                        {group}
                    </Label>
                    <Item.Group divided>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity}></ActivityListItem>  
                        ))}
                    </Item.Group>
                </Fragment>
            ))}
        </Fragment>
    );
}

export default observer (ActivityList);