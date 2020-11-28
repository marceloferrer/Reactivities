import React, { useContext } from 'react'
import {Form as FinalForm, Field} from 'react-final-form'
import { Button, Form } from 'semantic-ui-react'
import { TextInput } from '../../app/common/form/TextInput'
import { IUserFormValues } from '../../app/models/user';
import { RootStoreContext } from '../../app/stores/rootStore';

export const loginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    return (
        <FinalForm 
            onSubmit={(values : IUserFormValues) => login(values)} 
            render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Field
                        name='email'
                        component={TextInput}
                        placeholder='Email'
                    />
                    <Field
                        name='password'
                        component={TextInput}
                        placeholder='Password'
                        type='password'
                    />
                    <Button positive content='Login'></Button>
                </Form>
            )}
        />
    );
};

export default LoginForm;