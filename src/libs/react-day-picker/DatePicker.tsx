import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form';
import { isNullOrUndefined } from '@utils/validate-utils';
import React, { ReactNode } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import { useController, UseControllerProps } from 'react-hook-form';
import { styled } from 'twin.macro';
import { formatDate, parseDate } from './react-day-picker-utils';

type Props<FormValues> = Partial<Omit<DayPickerInputProps, 'placeholder'>> & {
  inputDescription?: ReactNode;
  controller: UseControllerProps<FormValues>;
};

function DatePicker<FormValues>({
  inputDescription,
  inputProps,
  dayPickerProps,
  controller,
  ...pickerProps
}: Props<FormValues>) {
  const { field, fieldState } = useController(controller);

  const { value } = field;
  const errorMessage = fieldState.error?.message;
  const isInvalid = !isNullOrUndefined(errorMessage);

  return (
    <StyledWrapper>
      <DayPickerInput
        {...pickerProps}
        inputProps={{
          ...inputProps,
          ref: field.ref,
          'aria-invalid': isInvalid,
          name: field.name,
          onChange: field.onChange,
          onBlur: field.onBlur,
        }}
        // onDayChange won't work with user keyboard's input
        dayPickerProps={{ onDayClick: field.onChange }}
        placeholder=" "
        formatDate={formatDate}
        parseDate={parseDate}
        format="MM-dd-yyyy"
      />

      <StyledLabel isInvalid={isInvalid} isActive={!isNullOrUndefined(value)}>
        Date Picker
      </StyledLabel>

      <Form.TextWrapper>
        <Form.ErrorMessage>{errorMessage}</Form.ErrorMessage>
        <Form.Description>{inputDescription}</Form.Description>
      </Form.TextWrapper>
    </StyledWrapper>
  );
}

const StyledWrapper = styled(Form.Group)`
  input {
    ${inputCss}
  }
`;

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

DatePicker.displayName = 'DatePicker';
export default DatePicker;
