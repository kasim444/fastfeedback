import Image from 'next/image';

function Logo({ width, height }) {
  return (
    <Image src="/logo.png" alt="Fast Feedback" width={width || '124'} height={height || '124'} />
  );
}

export default Logo;
