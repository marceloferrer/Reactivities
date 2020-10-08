import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

export const NavBar = () => {
    return (
        <div>
        <Menu fixed='top' inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}></img>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item>
                    <Button positive content='Create Activity'></Button>
                </Menu.Item>
            </Container>
        </Menu>
    </div>
    )
}

export default NavBar