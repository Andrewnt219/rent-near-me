import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form';
import { isEmptyString } from '@utils/validate-utils';
import React, { ReactNode } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';
import { styled } from 'twin.macro';
import { formatDate, parseDate } from './react-day-picker-utils';

type Props<FormValues extends FieldValues> = Partial<
  Omit<DayPickerInputProps, 'placeholder'>
> & {
  inputDescription?: ReactNode;
  controller: UseControllerProps<FormValues>;
};

function DatePicker<FormValues extends FieldValues>({
  inputDescription,
  inputProps,
  dayPickerProps,
  controller,
  ...pickerProps
}: Props<FormValues>) {
  const { field, fieldState } = useController(controller);

  const { value } = field;
  console.log(value);
  return (
    <StyledWrapper>
      <DayPickerInput
        format="MM-dd-yyyy"
        {...pickerProps}
        inputProps={{
          ...inputProps,
          ref: field.ref,
          'aria-invalid': fieldState.invalid,
          name: field.name,
          onChange: field.onChange,
          onBlur: field.onBlur,
        }}
        // onDayChange won't work with user keyboard's input
        dayPickerProps={{ ...dayPickerProps, onDayClick: field.onChange }}
        placeholder=" "
        formatDate={formatDate}
        parseDate={parseDate}
      />

      <StyledLabel
        isInvalid={fieldState.invalid}
        isActive={!isEmptyString(value)}
      >
        Date Picker
      </StyledLabel>

      <Form.TextWrapper>
        <Form.ErrorMessage>{fieldState.error?.message}</Form.ErrorMessage>
        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </StyledWrapper>
  );
}

type StyledLabelProps = {
  isActive: boolean;
  isInvalid: boolean;
};
const StyledLabel = styled(Form.Label)<StyledLabelProps>`
  && {
    ${(p) => p.isActive && labelActiveCss}
    ${(p) => p.isInvalid && labelInvalidCss}
  }
`;

const StyledWrapper = styled(Form.Group)`
  input {
    ${inputCss}
  }

  &:focus-within ${StyledLabel} {
    ${labelActiveCss}
  }
`;

export default DatePicker;
