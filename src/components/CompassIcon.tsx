import * as React from "react";
import Svg, { Defs, ClipPath, Rect, G, Path } from "react-native-svg";

interface CompassIconProps {
  size?: number;
  direction?: number;
  color?: string;
}

// const SVGComponent = (props as CompassIconProps)  => (
const CompassIcon = ({ size = 80, ...props }: CompassIconProps) => {
  return (
    <Svg width="30" height="30" viewBox="0 0 32 32" {...props}>
      <Defs>
        <ClipPath id="clip-compass">
          <Rect width={32} height={32} />
        </ClipPath>
      </Defs>
      <G id="compass" clipPath="url(#clip-compass)">
        <G
          id="Group_2146"
          data-name="Group 2146"
          transform="translate(-156 -364)"
        >
          <G id="Group_2133" data-name="Group 2133">
            <G id="Group_2132" data-name="Group 2132">
              <G id="Group_2131" data-name="Group 2131">
                <Path
                  id="Path_3791"
                  data-name="Path 3791"
                  d="M172,364.167A15.833,15.833,0,1,0,187.833,380,15.851,15.851,0,0,0,172,364.167Zm0,29.666A13.833,13.833,0,1,1,185.833,380,13.848,13.848,0,0,1,172,393.833Z"
                  fill="#fff"
                />
              </G>
            </G>
          </G>
          <G id="Group_2136" data-name="Group 2136">
            <G id="Group_2135" data-name="Group 2135">
              <G id="Group_2134" data-name="Group 2134">
                <Path
                  id="Path_3792"
                  data-name="Path 3792"
                  d="M174.4,379.314c0-.005-.009-.007-.012-.012a2.482,2.482,0,0,0-.62-1.07,2.4,2.4,0,0,0-1.048-.6c-.013-.01-.02-.026-.034-.034l-6.645-4.25a.5.5,0,0,0-.691.69l4.25,6.645s.009.006.012.01a2.409,2.409,0,0,0,1.693,1.695l.009.008,6.645,4.25a.494.494,0,0,0,.27.08.5.5,0,0,0,.421-.77Zm-3.887.751c0-.031-.007-.062-.007-.093a1.5,1.5,0,0,1,.1-.489c.013-.034.029-.067.044-.1a1.513,1.513,0,0,1,.294-.444,1.555,1.555,0,0,1,.27-.21c.026-.016.054-.028.082-.043a1.451,1.451,0,0,1,.228-.1c.032-.011.064-.02.1-.029a1.484,1.484,0,0,1,.25-.043c.029,0,.057-.007.087-.008a1.491,1.491,0,0,1,.345.026h0a1.5,1.5,0,0,1,.759,2.53,1.538,1.538,0,0,1-2.122,0A1.489,1.489,0,0,1,170.513,380.065ZM173,382.289a2.434,2.434,0,0,0,1.289-1.294l2.295,3.587Z"
                  fill="#fff"
                />
              </G>
            </G>
          </G>
          <G id="Group_2139" data-name="Group 2139">
            <G id="Group_2138" data-name="Group 2138">
              <G id="Group_2137" data-name="Group 2137">
                <Path
                  id="Path_3793"
                  data-name="Path 3793"
                  d="M172,372.871a.5.5,0,0,0-.5.5v1.2a.5.5,0,0,0,1,0v-.67a6.133,6.133,0,0,1,5.6,5.6h-.67a.5.5,0,0,0,0,1h1.195a.5.5,0,0,0,.5-.5A7.137,7.137,0,0,0,172,372.871Z"
                  fill="#fff"
                />
              </G>
            </G>
          </G>
          <G id="Group_2142" data-name="Group 2142">
            <G id="Group_2141" data-name="Group 2141">
              <G id="Group_2140" data-name="Group 2140">
                <Path
                  id="Path_3794"
                  data-name="Path 3794"
                  d="M172,384.934a.5.5,0,0,0-.5.5v.67a6.133,6.133,0,0,1-5.6-5.6h.67a.5.5,0,0,0,0-1h-1.195a.5.5,0,0,0-.5.5A7.137,7.137,0,0,0,172,387.129a.5.5,0,0,0,.5-.5v-1.2A.5.5,0,0,0,172,384.934Z"
                  fill="#fff"
                />
              </G>
            </G>
          </G>
          <G id="Group_2145" data-name="Group 2145">
            <G id="Group_2144" data-name="Group 2144">
              <G id="Group_2143" data-name="Group 2143">
                <Path
                  id="Path_3795"
                  data-name="Path 3795"
                  d="M172,368.063A11.938,11.938,0,1,0,183.937,380,11.951,11.951,0,0,0,172,368.063Zm.5,22.849v-1.537a.5.5,0,0,0-1,0v1.537A10.933,10.933,0,0,1,161.088,380.5h1.537a.5.5,0,0,0,0-1h-1.537A10.933,10.933,0,0,1,171.5,369.088v1.537a.5.5,0,0,0,1,0v-1.537A10.933,10.933,0,0,1,182.912,379.5h-1.537a.5.5,0,0,0,0,1h1.537A10.933,10.933,0,0,1,172.5,390.912Z"
                  fill="#fff"
                />
              </G>
            </G>
          </G>
        </G>
      </G>
    </Svg>
  );
};
export default CompassIcon;
