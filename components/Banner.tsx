import { StyleSheet } from "react-native";
import { Svg, Defs, Image, Pattern, Rect } from "react-native-svg";

export const Banner = () => {
  return (
    <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
      <Defs>
        <Pattern
          id="pattern"
          patternUnits="userSpaceOnUse"
          width="400"
          height="400"
        >
          <Image
            href={require("@/assets/images/banner.png")}
            width="400"
            height="400"
            preserveAspectRatio="xMidYMid slice"
          />
        </Pattern>
      </Defs>

      <Rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="url(#pattern)"
        opacity={0.15}
      />
    </Svg>
  );
};

export default Banner;
