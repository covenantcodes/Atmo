import * as React from "react";
import Svg, {
  ForeignObject,
  G,
  Path,
  Ellipse,
  Defs,
  ClipPath,
  LinearGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface WindyIconProps extends SvgProps {
  size?: number;
}

const WindyIcon = ({ size = 80, ...props }: WindyIconProps) => {
  const wind1 = useSharedValue(0);
  const wind2 = useSharedValue(0);

  React.useEffect(() => {
    wind1.value = withRepeat(withTiming(1, { duration: 2200 }), -1, true);
    wind2.value = withRepeat(withTiming(1, { duration: 2600 }), -1, true);
  }, []);

  const createWindAnimatedProps = (
    progress: typeof wind1,
    xFrom: number,
    xTo: number
  ) =>
    useAnimatedProps(() => ({
      transform: [
        {
          translateX: interpolate(progress.value, [0, 1], [xFrom, xTo]),
        },
      ],
    }));

  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 134 104"
      fill="none"
      {...props}
    >
      <ForeignObject x={54} y={-7} width={87} height={58.6111}></ForeignObject>
      <G filter="url(#filter0_i_1_535)" data-figma-bg-blur-radius={7}>
        <AnimatedPath
          fillRule="evenodd"
          clipRule="evenodd"
          d="M113.046 20.2778C113.046 20.8106 113.025 21.3387 112.985 21.8612C115.206 20.0275 118.053 18.9259 121.157 18.9259C128.25 18.9259 134 24.6758 134 31.7685C134 38.6346 128.612 44.2423 121.833 44.5936V44.6111H72.4905V44.5408C66.0333 43.8651 61 38.4046 61 31.7685C61 25.1187 66.0541 19.6493 72.5306 18.9921C73.1938 8.39202 82.001 0 92.7683 0C103.967 0 113.046 9.07867 113.046 20.2778Z"
          fill="url(#paint0_linear_1_535)"
          animatedProps={createWindAnimatedProps(wind1, 0, 8)}
        />
      </G>
      <G filter="url(#filter1_f_1_535)">
        <Ellipse cx={53.5} cy={72.5} rx={31.5} ry={9.5} fill="#dcdcdc5f" />
      </G>
      <ForeignObject x={-7} y={-2} width={122} height={80}></ForeignObject>
      <G filter="url(#filter2_i_1_535)" data-figma-bg-blur-radius={7}>
        <AnimatedPath
          fillRule="evenodd"
          clipRule="evenodd"
          d="M77 35C77 35.7882 76.9696 36.5693 76.9099 37.3422C80.1949 34.6296 84.4071 33 89 33C99.4934 33 108 41.5066 108 52C108 62.158 100.029 70.4541 90 70.9741V71H89H19H17V70.896C7.44667 69.8966 0 61.8179 0 52C0 42.1618 7.47752 34.07 17.0593 33.0979C18.0405 17.4156 31.0704 5 47 5C63.5685 5 77 18.4315 77 35Z"
          fill="url(#paint1_linear_1_535)"
          animatedProps={createWindAnimatedProps(wind2, 0, -8)}
        />
      </G>
      <Defs>
        <ClipPath id="bgblur_0_1_535_clip_path">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M113.046 20.2778C113.046 20.8106 113.025 21.3387 112.985 21.8612C115.206 20.0275 118.053 18.9259 121.157 18.9259C128.25 18.9259 134 24.6758 134 31.7685C134 38.6346 128.612 44.2423 121.833 44.5936V44.6111H72.4905V44.5408C66.0333 43.8651 61 38.4046 61 31.7685C61 25.1187 66.0541 19.6493 72.5306 18.9921C73.1938 8.39202 82.001 0 92.7683 0C103.967 0 113.046 9.07867 113.046 20.2778Z"
          />
        </ClipPath>
        <ClipPath id="bgblur_1_1_535_clip_path">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M77 35C77 35.7882 76.9696 36.5693 76.9099 37.3422C80.1949 34.6296 84.4071 33 89 33C99.4934 33 108 41.5066 108 52C108 62.158 100.029 70.4541 90 70.9741V71H89H19H17V70.896C7.44667 69.8966 0 61.8179 0 52C0 42.1618 7.47752 34.07 17.0593 33.0979C18.0405 17.4156 31.0704 5 47 5C63.5685 5 77 18.4315 77 35Z"
          />
        </ClipPath>
        <LinearGradient
          id="paint0_linear_1_535"
          x1={79.5}
          y1={54.5}
          x2={126.227}
          y2={-0.00000727901}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.170077} stopColor="#c4dae9ff" />
          <Stop offset={0.538523} stopColor="#d5e7f4ff" stopOpacity={0.9} />
          <Stop offset={1} stopColor="#cbe0eeff" stopOpacity={0} />
        </LinearGradient>
        <LinearGradient
          id="paint1_linear_1_535"
          x1={56}
          y1={94.5}
          x2={96.5}
          y2={5}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#cfdde7ff" />
          <Stop offset={0.299998} stopColor="#c5e1f4ff" stopOpacity={0.75} />
          <Stop offset={1} stopColor="#a5cfedff" stopOpacity={0} />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
export default WindyIcon;
