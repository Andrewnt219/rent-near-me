import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form';
import { isNullOrUndefined } from '@utils/validate-utils';
import React, { forwardRef, ReactNode } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DayPickerInputProps } from 'react-day-picker/types/Props';
import { styled } from 'twin.macro';
import { formatDate, parseDate } from './react-day-picker-utils';

type Props = Partial<Omit<DayPickerInputProps, 'placeholder'>> & {
  errorMessage?: ReactNode;
  inputDescription?: ReactNode;
  isInputActive: boolean;
};
type Ref = HTMLInputElement;
const DatePicker = forwardRef<Ref, Props>(
  (
    {
      errorMessage,
      inputDescription,
      isInputActive,
      inputProps,
      dayPickerProps,
      ...pickerProps
    },
    ref
  ) => {
    const isInvalid = !isNullOrUndefined(errorMessage);

    return (
      <StyledWrapper>
        <DayPickerInput
          {...pickerProps}
          inputProps={{
            ...inputProps,
            'aria-invalid': isInvalid,
          }}
          dayPickerProps={dayPickerProps}
          placeholder=" "
          formatDate={formatDate}
          parseDate={parseDate}
          format="MM-dd-yyyy"
        />

        <StyledLabel isInvalid={isInvalid} isActive={isInputActive}>
          Date Picker
        </StyledLabel>

        <Form.TextWrapper>
          <Form.ErrorMessage>{errorMessage}</Form.ErrorMessage>
          <Form.Description>{inputDescription}</Form.Description>
        </Form.TextWrapper>
      </StyledWrapper>
    );
  }
);

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
