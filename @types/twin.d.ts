/* eslint-disable no-undef */
// twin.d.ts
import { Icon } from '@iconify/react';
import { ComponentProps, VFC } from 'react';
import styledImport, { css as cssImport, CSSProp } from 'styled-components';
import 'twin.macro';

declare module 'twin.macro' {
  // The styled and css imports
  const styled: typeof styledImport;
  const css: typeof cssImport;
}

declare module 'react' {
  // The css prop
  interface HTMLAttributes<T> extends DOMAttributes<T> {
    css?: CSSProp;
  }
  // The inline svg css prop
  interface SVGProps extends SVGProps<SVGSVGElement> {
    css?: CSSProp;
  }

  interface SVGAttributes extends SVGAttributes<SVGElement> {
    css?: CSSProp;
  }
}
