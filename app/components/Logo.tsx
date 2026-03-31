import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="text-2xl font-extrabold">
      <span className="text-black-500">TR</span>
      <span className="text-black-500 dark:text-teal-500">B</span>
      <span className="text-green-500 dark:text-teal-400">TREE</span>
    </Link>
  );
}