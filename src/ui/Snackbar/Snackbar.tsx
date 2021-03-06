import tw, { styled } from 'twin.macro';
import ReachAlert from '@reach/alert';
import { ReactNode } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import bellFill from '@iconify/icons-eva/bell-fill';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';
import infoFill from '@iconify/icons-eva/info-fill';
import Text from '@ui/Text/Text';
import { Button } from '@ui/Button';

type Props = {
  /**
   * Classname to merge styles
   */
  className?: string;
  /**
   * Title text (not the title attribute)
   */
  title?: ReactNode;
  /**
   * Color theme
   */
  severity: StyledIconContainerProps['severity'];
  /**
   * Body text
   */
  message: ReactNode;
  onDismiss(): void;
};

/**
 * Uses for showing/alerting a short message
 */
function Snackbar({ className, severity = 'default', ...props }: Props) {
  return (
    <StyledContainer type="assertive" className={className}>
      <SnackbarIcon severity={severity} />

      <div tw="flex-1">
        {props.title && (
          <Text component="h3" variant="sub2">
            {props.title}
          </Text>
        )}

        <Text tw="text-muted">{props.message}</Text>
      </div>
      <Button
        icon
        size="sm"
        variant="ghost"
        onClick={props.onDismiss}
        tw="  text-muted ml-auto flex-center"
      >
        <Icon icon={closeFill} tw="w-5 h-5" />
        <span tw="sr-only">Dismiss snackbar</span>
      </Button>
    </StyledContainer>
  );
}

const StyledContainer = styled(ReachAlert)`
  ${tw`flex items-center gap-md text-body2`}
  ${tw`rounded-lg bg-white`}
  ${tw`shadow-z8 p-md`}
`;

/* -------------------------------------------------------------------------- */
/*                             ANCHOR: SNACKBAR ICON                          */
/* -------------------------------------------------------------------------- */
type SnackbarIconProps = {
  /**
   * Classname to merge styles
   */
  className?: string;
  /**
   * Color theme
   */
  severity: StyledIconContainerProps['severity'];
};
function SnackbarIcon(props: SnackbarIconProps) {
  let icon: IconifyIcon = bellFill;

  switch (props.severity) {
    case 'error':
      icon = closeCircleFill;
      break;

    case 'success':
      icon = checkmarkCircle2Fill;
      break;

    case 'warning':
      icon = alertTriangleFill;
      break;

    case 'info':
      icon = infoFill;
      break;

    case 'default':
    default:
      break;
  }

  return (
    <StyledIconContainer severity={props.severity}>
      <Icon icon={icon} tw="w-6 h-6" className={props.className} />
    </StyledIconContainer>
  );
}

type StyledIconContainerProps = {
  severity: 'default' | 'error' | 'info' | 'success' | 'warning';
};
const StyledIconContainer = styled.span<StyledIconContainerProps>`
  ${(p) => styleSeverity(p.severity)}
  ${tw`w-10 h-10 flex items-center justify-center  self-start rounded-xl`}
`;

/**
 * Returns color theme base on severity
 */
const styleSeverity = (severity: StyledIconContainerProps['severity']) => {
  switch (severity) {
    case 'error':
      return tw`bg-danger-light svg:text-danger`;

    case 'info':
      return tw`bg-info-light svg:text-info`;

    case 'success':
      return tw`bg-success-light svg:text-success`;

    case 'warning':
      return tw`bg-warning-light  svg:text-warning`;

    case 'default':
    default:
      return tw`bg-primary-light svg:text-primary`;
  }
};

export default Snackbar;
