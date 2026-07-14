/* /assets/icons/ui/facebook-social.tsx */

import { ReactElement } from 'react';
import { SvgXml } from 'react-native-svg';

interface FacebookSocialSvgProps {
  primaryColor?: string;
  secondaryColor?: string;
  color?: string;
  size?: string | number;
}

const FacebookSocialSvg = ({ primaryColor, secondaryColor, color, size: defaultSize = 40 }: FacebookSocialSvgProps): ReactElement => {
  const resolvedPrimary = primaryColor ?? color ?? "#2260FF";
  const resolvedSecondary = secondaryColor ?? resolvedPrimary;

  return (
    <SvgXml
      width={defaultSize}
      height={defaultSize}
      xml={`<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="13" cy="13" r="12" stroke="#2260FF" stroke-width="2"/>
<path d="M17 8H16C14.5 8 13 8.8 13 12C13 15.2 13 21.8333 13 25M17 15H9" stroke="#2260FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

`}
    />
  );
};

export default FacebookSocialSvg;