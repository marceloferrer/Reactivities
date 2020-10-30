import React, { useContext } from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Link, NavLink } from 'react-router-dom';

export const NavBar: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    return (
        <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header as={NavLink} exact to='/'>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                <Menu.Item>
                    <Button as={NavLink} to='/CreateActivity' positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    </div>
    )
}

export default observer(NavBar);