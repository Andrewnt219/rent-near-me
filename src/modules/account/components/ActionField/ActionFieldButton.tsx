import { Button } from '@ui/Button';
import { ButtonBaseProps } from '@ui/Button/styles';
import tw, { styled } from 'twin.macro';

const attrs: ButtonBaseProps = {
  variant: 'ghost',
  size: 'sm',
};
const ActionFieldButton = styled(Button).attrs(attrs)`
  ${tw`text-secondary font-semibold`}
`;

export default ActionFieldButton;
