import { observer } from 'mobx-react-lite';
import React, { Fragment, useContext } from 'react'
import { Item, Label } from 'semantic-ui-react'
import { RootStoreContext } from '../../../app/stores/rootStore';
import { ActivityListItem } from './ActivityListItem';

export const ActivityList: React.FC = () => {
    const rootStore = useContext(RootStoreContext);
    const {activitiesByDate} = rootStore.activityStore;

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