import useScramble from './hooks/useScramble';

/* Character-scramble reveal: resolves `text` from noise over 14 frames
   once `active` flips true. Used for short labels/tags that should resolve
   as their section scrolls into view (or any other active-boolean trigger).
   Backed by the shared useScramble hook. */
export default function ScrambleText({ text, active, delay = 0 }) {
  const display = useScramble(text, active, { delay });
  return <span>{display}</span>;
}
