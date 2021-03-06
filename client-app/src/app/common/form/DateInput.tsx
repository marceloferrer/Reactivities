import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react'
import {DateTimePicker} from 'react-widgets';

interface IProps extends FieldRenderProps<Date, HTMLElement>, 
FormFieldProps {id?: string}

export const DateInput: React.FC<IProps> = ({
    input,
    width,
    placeholder, 
    date = false,
    time = false,
    meta: {touched, error},
    ...rest
}) => {
    return (
        /*Validate if is touched and error is not null to boolean*/
        <Form.Field error={touched && !!error} width={width}>
        <DateTimePicker 
            placeholder={placeholder}
            value={input.value || null}
            onChange={input.onChange}
            onBlur={input.onBlur}
            onKeyDown={(e=>e.preventDefault())}
            date={date}
            time={time}
            {...rest}
        ></DateTimePicker>
        {touched && error && (
            <Label basic color='red'>
                {error}
            </Label>
        )}
        </Form.Field>
    )
}

export default DateInput;