// components/IconArrowUp.tsx
import React from "react";
import Svg, {
  G,
  Rect,
  Mask,
  Path,
  Defs,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeComposite,
  FeBlend,
} from "react-native-svg";

const IconArrowUp = () => (
  <Svg width={34} height={34} viewBox="0 0 34 34" fill="none">
    <G filter="url(#filter0_d)">
      <Rect
        x="31.9383"
        y="1.93857"
        width={30}
        height={30}
        rx={15}
        transform="rotate(89.7648 31.9383 1.93857)"
        fill="white"
      />
      <Mask
        id="mask0"
        maskUnits="userSpaceOnUse"
        x={1}
        y={1}
        width={32}
        height={32}
      >
        <Rect
          x="31.9383"
          y="1.93857"
          width={30}
          height={30}
          transform="rotate(89.7648 31.9383 1.93857)"
          fill="#D9D9D9"
        />
      </Mask>
      <G mask="url(#mask0)">
        <Path
          d="M15.9337 10.9731L9.19058 17.7717C8.9831 17.9809 8.7405 18.0843 8.46278 18.0819C8.18485 18.0795 7.94129 17.9746 7.73211 17.7671C7.53001 17.5596 7.42661 17.317 7.42193 17.0393C7.41725 16.7616 7.51865 16.5182 7.72612 16.309L16.2329 7.73212C16.3435 7.62063 16.4577 7.54203 16.5757 7.49634C16.6934 7.45086 16.8217 7.42783 16.9607 7.42726C17.0996 7.42669 17.2282 7.44866 17.3463 7.49318C17.4646 7.5379 17.5795 7.61556 17.691 7.72614L26.2678 16.2329C26.4699 16.4333 26.5715 16.6741 26.5727 16.9554C26.5738 17.2366 26.4742 17.4818 26.2738 17.691C26.0663 17.9002 25.822 18.0054 25.5407 18.0065C25.2595 18.0077 25.0143 17.9045 24.8051 17.697L18.0168 10.9645L18.0783 25.9541C18.0795 26.2526 17.9816 26.5013 17.7845 26.7C17.5874 26.8987 17.3396 26.9987 17.041 26.9999C16.7425 27.0011 16.4938 26.9032 16.2951 26.7061C16.0964 26.509 15.9964 26.2612 15.9952 25.9626L15.9337 10.9731Z"
          fill="#F9B233"
        />
      </G>
    </G>
    <Defs>
      <Filter
        id="filter0_d"
        x="-0.061"
        y="-0.061"
        width="34.123"
        height="34.123"
        filterUnits="userSpaceOnUse"
      >
        <FeFlood floodOpacity={0} result="BackgroundImageFix" />
        <FeColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <FeOffset />
        <FeGaussianBlur stdDeviation={1} />
        <FeComposite in2="hardAlpha" operator="out" />
        <FeColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <FeBlend
          in2="BackgroundImageFix"
          mode="normal"
          result="effect1_dropShadow"
        />
        <FeBlend
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </Filter>
    </Defs>
  </Svg>
);

export default IconArrowUp;
