import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'

interface IProps extends FieldRenderProps<string, HTMLElement>, 
FormFieldProps {}

export const TextInput: React.FC<IProps> = ({
    input,
    width,
    type, 
    placeholder, 
    meta: {touched, error}}) => {
    return (
        /*Validate if is touched and error is not null to boolean*/
        <Form.Field error={touched && !!error} type={type} width={width}>
            <input {...input} placeholder={placeholder}></input>
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}
