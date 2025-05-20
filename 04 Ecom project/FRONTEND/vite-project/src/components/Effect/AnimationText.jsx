import { TypeAnimation } from 'react-type-animation';

export const AnimationText = () => {
  return (
    <div>
      <TypeAnimation
        sequence={[
          `Grab Upto 50% Off On Selected Products`,
          1000,
          "",
        ]}
        speed={50}
        style={{ whiteSpace: 'pre-line', fontSize: '40px' }}
        repeat={Infinity}
      />
    </div>
  );
};