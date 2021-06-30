import Form, { inputCss, labelActiveCss } from '@ui/Form';
import React, { useState } from 'react';
import Picker from 'react-datepicker';
import tw, { styled } from 'twin.macro';

const DatePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <StyledWrapper>
      <Picker
        placeholderText=" "
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
      <StyledLabel isActive={startDate !== null}>Date Picker</StyledLabel>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  ${tw`relative`}

  input {
    ${inputCss}
  }

  &:focus-within label {
    ${labelActiveCss}
  }
`;

type StyledLabelProps = {
  isActive: boolean;
};
const StyledLabel = styled(Form.Label)<StyledLabelProps>`
  ${(p) => p.isActive && labelActiveCss}
`;

export default DatePicker;
