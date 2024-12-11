import { LuLoader2 } from 'react-icons/lu';

export default function Loader({ color }: { color?: string }) {
  return (
    <LuLoader2
      className={`h-5 w-5 origin-center animate-spin repeat-infinite text-${color ? color : 'black'}`}
    />
  );
}
