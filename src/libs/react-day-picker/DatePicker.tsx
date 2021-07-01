import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form';
import { isNullOrUndefined, isValidDate } from '@utils/validate-utils';
import React, { ReactNode } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import { useController, UseControllerProps } from 'react-hook-form';
import { styled } from 'twin.macro';
import { formatDate, parseDate } from './react-day-picker-utils';

type Props<FormValues> = UseControllerProps<FormValues> &
  Partial<Omit<DayPickerInputProps, 'placeholder'>> & {
    inputDescription?: ReactNode;
  };

function DatePicker<FormValues>({
  inputDescription,
  inputProps,
  dayPickerProps,
  ...props
}: Props<FormValues>) {
  const { name, control, rules, defaultValue, ...pickerProps } = props;
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  const isInvalid = !isNullOrUndefined(fieldState.error?.message);
  const { value } = field;

  return (
    <StyledWrapper>
      <DayPickerInput
        {...pickerProps}
        inputProps={{
          ...inputProps,
          ref: field.ref,
          'aria-invalid': isInvalid,
        }}
        dayPickerProps={dayPickerProps}
        onDayChange={field.onChange}
        onBlur={field.onBlur}
        value={isValidDate(value) ? value : undefined}
        placeholder=" "
        formatDate={formatDate}
        parseDate={parseDate}
        format="MM-dd-yyyy"
      />

      <StyledLabel isInvalid={isInvalid} isActive={!isNullOrUndefined(value)}>
        Date Picker
      </StyledLabel>

      <Form.TextWrapper>
        <Form.ErrorMessage>{fieldState.error?.message}</Form.ErrorMessage>
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
