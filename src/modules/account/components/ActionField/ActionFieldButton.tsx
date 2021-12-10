import { StyledComponentProps } from '@common-types';
import { ButtonGhost } from '@ui/Button';
import tw, { styled } from 'twin.macro';

type ButtonProps = StyledComponentProps<typeof ButtonGhost>;
const attrs: ButtonProps = {
  size: 'sm',
};
const ActionFieldButton = styled(ButtonGhost).attrs(attrs)`
  ${tw`text-secondary font-semibold`}
`;

export default ActionFieldButton;
