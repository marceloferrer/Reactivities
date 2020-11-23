import React from 'react'
import { FieldRenderProps } from 'react-final-form';
import { Form, FormFieldProps, Label, Select } from 'semantic-ui-react';

interface IProps extends FieldRenderProps<string, HTMLElement>, 
FormFieldProps {}

export const SelectInput: React.FC<IProps> = ({
    input,
    width,
    options, 
    placeholder, 
    meta: {touched, error}
}) => {
    return (
        /*Validate if is touched and error is not null to boolean*/
        <Form.Field error={touched && !!error} width={width}>
            <Select 
                value={input.value} 
                onChange={(e, data) => input.onChange(data.value)}
                placeholder={placeholder}
                options={options}
            />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}

export default SelectInput;