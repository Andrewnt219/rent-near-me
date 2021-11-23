import { useRect } from '@reach/rect';
import {
  Tabs as ReachTabs,
  TabsKeyboardActivation,
  TabsProps as ReachTabsProps,
  TabList as ReachTabList,
  TabListProps as ReachTabListProps,
  Tab as ReachTab,
  TabProps as ReachTabProps,
  TabPanels as ReachTabPanels,
  TabPanel as ReachTabPanel,
} from '@reach/tabs';
import { FC, useEffect, useRef, VFC } from 'react';
import tw, { css, styled } from 'twin.macro';
import {
  TabSectionProvider,
  TabSectionContextValue,
  useTabSection,
} from './TabSectionContext';

/* ====================
TabSection
==================== */

type TabSectionProps = ReachTabsProps & {
  theme?: TabSectionContextValue['theme'];
};
export const TabSection: FC<TabSectionProps> = ({
  theme = 'primary',
  children,
  ...props
}) => {
  return (
    <ReachTabs keyboardActivation={TabsKeyboardActivation.Manual} {...props}>
      <TabSectionProvider theme={theme}>{children}</TabSectionProvider>
    </ReachTabs>
  );
};

/* ====================
TabHeader
==================== */

type TabHeaderProps = ReachTabListProps & {
  align?: 'left' | 'right' | 'center';
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export const TabHeader: FC<TabHeaderProps> = ({ children, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rect = useRect(ref);
  return (
    <StyledTabHeader ref={ref} {...props}>
      {children}
      <SelectedTabIndicator tabHeaderRect={rect} />
    </StyledTabHeader>
  );
};
const StyledTabHeader = styled(ReachTabList)<TabHeaderProps>`
  ${tw`relative flex bg-transparent mb-md`}
  ${(p) => getTabHeaderAlignStyle(p.align)}
  ${(p) => getTabHeaderGapStyle(p.gap)}
`;
const getTabHeaderAlignStyle = (align: TabHeaderProps['align']) => {
  if (align === 'right') {
    return tw`justify-end`;
  }
  if (align === 'center') {
    return tw`justify-center`;
  }
  return tw`justify-start`;
};
const getTabHeaderGapStyle = (gap: TabHeaderProps['gap']) => {
  switch (gap) {
    case 'xs':
      return tw`gap-xs`;
    case 'sm':
      return tw`gap-sm`;
    case 'lg':
      return tw`gap-lg`;
    case 'xl':
      return tw`gap-xl`;
    default:
      return tw`gap-md`;
  }
};

/* ====================
SelectedTabIndicator
==================== */

type SelectedTabIndicatorProps = {
  tabHeaderRect: DOMRect | null;
};
export const SelectedTabIndicator: VFC<SelectedTabIndicatorProps> = ({
  tabHeaderRect,
}) => {
  const { selectedButtonRect, theme } = useTabSection();
  return (
    <span
      css={getSelectedTabIndicatorStyle(theme)}
      style={{
        left: (selectedButtonRect?.left ?? 0) - (tabHeaderRect?.left ?? 0),
        width: selectedButtonRect?.width,
      }}
    />
  );
};
const getSelectedTabIndicatorStyle = (
  theme: TabSectionContextValue['theme']
) => css`
  ${tw`absolute bottom-0 h-0.5`}
  ${tw`transition-all duration-500`}
  ${getSelectedTabIndicatorThemeStyle(theme)}
`;
const getSelectedTabIndicatorThemeStyle = (
  theme: TabSectionContextValue['theme']
) => {
  if (theme === 'secondary') {
    return tw`bg-secondary`;
  }
  return tw`bg-primary`;
};

/* ====================
TabButton
==================== */

type TabButtonProps = ReachTabProps & {
  isSelected?: boolean;
};
export const TabButton: FC<TabButtonProps> = ({ isSelected, ...props }) => {
  const { setSelectedButtonRect } = useTabSection();
  const ref = useRef<HTMLButtonElement>(null);
  const rect = useRect(ref, { observe: isSelected });

  useEffect(() => {
    if (isSelected) {
      setSelectedButtonRect(rect);
    }
  }, [isSelected, rect, setSelectedButtonRect]);

  return <StyledTabButton ref={ref} {...props} />;
};
const StyledTabButton = styled(ReachTab)<TabButtonProps>`
  ${tw`text-body1 min-w-[3.5rem] font-semibold px-0 py-3 border-b-0`}
`;

/* ====================
TabBody
==================== */

export const TabBody = styled(ReachTabPanels)``;

/* ====================
TabContent
==================== */

export const TabContent = styled(ReachTabPanel)``;
