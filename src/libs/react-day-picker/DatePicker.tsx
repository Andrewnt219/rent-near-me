import Form, { inputCss, labelActiveCss, labelInvalidCss } from '@ui/Form';
import { isNullOrUndefined } from '@utils/validate-utils';
import React, { forwardRef, ReactNode, useState } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { styled } from 'twin.macro';
import { formatDate, parseDate } from './react-day-picker-utils';

type Props = Partial<Omit<DayPickerInput, 'onDayChange' | 'placeholder'>> & {
  errorMessage?: ReactNode;
  inputDescription?: ReactNode;
};
type Ref = DayPickerInput;
const DatePicker = forwardRef<Ref, Props>(
  ({ errorMessage, inputDescription, ...pickerProps }, ref) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const isInvalid = !isNullOrUndefined(errorMessage);

    return (
      <StyledWrapper>
        <DayPickerInput
          {...pickerProps}
          inputProps={{
            'aria-invalid': isInvalid,
          }}
          ref={ref}
          placeholder=" "
          onDayChange={setStartDate}
          formatDate={formatDate}
          parseDate={parseDate}
          format="MM-dd-yyyy"
        />

        <StyledLabel
          isInvalid={isInvalid}
          isActive={!isNullOrUndefined(startDate)}
        >
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
