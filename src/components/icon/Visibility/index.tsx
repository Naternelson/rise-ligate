import { ForwardedRef, forwardRef } from "react";
import { Icon, IconProps } from "..";

export type VisibilityIconProps = IconProps & {off?: boolean}

export const VisibilityIcon = forwardRef((props:VisibilityIconProps, ref: ForwardedRef<SVGSVGElement>) => {
    const {off, ...iconProps} = props
    return (
      <Icon ref={ref} {...iconProps}>
        {off ? <OffVisibilityPartial /> : <OnVisibilityPartial />}
      </Icon>
    );
})

const OnVisibilityPartial = () => {
    return (
      <>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.12636 47.9308C18.3619 37.9421 33.6732 23 50 23C64.6075 23 76.6173 34.7418 85.7831 43.7032C88.2256 46.0912 90.4661 48.2817 92.5 50C90.8466 51.8338 89.2691 53.8681 87.6385 55.9711C80.2284 65.5274 71.7202 76.5 50 76.5C30.4184 76.5 19.4001 64.4651 10.8703 55.1483C9.16345 53.2839 7.55624 51.5284 6 50C6.68157 49.3408 7.39086 48.6486 8.12636 47.9308ZM50 66C58.8366 66 66 58.8366 66 50C66 41.1634 58.8366 34 50 34C41.1634 34 34 41.1634 34 50C34 58.8366 41.1634 66 50 66Z"
          fill="currentColor"
        />
        <path
          d="M57 50.5C57 54.6421 53.6421 58 49.5 58C45.3579 58 42 54.6421 42 50.5C42 46.3579 45.3579 43 49.5 43C53.6421 43 57 46.3579 57 50.5Z"
          fill="currentColor"
        />
      </>
    );
}

const OffVisibilityPartial = () => {
    return (
      <>
        <path
          id="Subtract"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24.96 33.0257C25.1502 32.8853 25.341 32.7456 25.5323 32.6067L36.8975 40.8148C36.7682 40.9989 36.6427 41.1858 36.5212 41.3754L24.96 33.0257ZM20.8595 36.2319C16.0904 40.1588 11.7843 44.3611 8.12637 47.9308L8.12636 47.9308C7.39086 48.6486 6.68157 49.3408 6 50C7.55624 51.5284 9.16345 53.2839 10.8703 55.1483C19.4001 64.4651 30.4184 76.5 50 76.5C58.6633 76.5 65.2247 74.7544 70.4529 72.0493L58.6042 63.4919C56.1196 65.0797 53.1673 66 50 66C41.1634 66 34 58.8366 34 50C34 48.645 34.1684 47.3294 34.4855 46.0729L20.8595 36.2319ZM42.0733 51.553C42.5853 55.1966 45.7152 58 49.5 58C49.9559 58 50.4023 57.9593 50.8358 57.8814L42.0733 51.553ZM62.4238 60.0829L75.0562 69.2062C75.2479 69.0671 75.4376 68.9267 75.6254 68.785L62.8385 59.5501C62.704 59.7306 62.5657 59.9083 62.4238 60.0829ZM55.46 55.0535L43.3033 46.2736C43.4305 46.0876 43.5658 45.9076 43.7087 45.7341L55.8457 54.4996C55.7253 54.6902 55.5966 54.875 55.46 55.0535ZM48.5461 43.0601L56.8632 49.0669C56.1944 45.6103 53.152 43 49.5 43C49.1769 43 48.8585 43.0204 48.5461 43.0601ZM66 50C66 51.7731 65.7116 53.4788 65.1791 55.0728L79.5247 65.4335C82.6372 62.421 85.1973 59.1193 87.6384 55.9712L87.6385 55.9711C89.2691 53.8681 90.8466 51.8338 92.5 50C90.4661 48.2817 88.2257 46.0912 85.7833 43.7033L85.7831 43.7032C76.6173 34.7418 64.6075 23 50 23C43.0256 23 36.2365 25.7266 29.9492 29.629L40.415 37.1876C43.0865 35.1858 46.4048 34 50 34C58.8366 34 66 41.1634 66 50Z"
          fill="currentColor"
        />
        <line
          id="Line 1"
          x1="16.4904"
          y1="26.437"
          x2="85.3982"
          y2="76.2037"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </>
    );
}