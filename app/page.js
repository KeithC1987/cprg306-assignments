import Image from "next/image";
import Link from "next/link";

export default function Home() {


  const LinkStyle ="underline text-cyan-600 hover:text-cyan-300"

  return (
    <main className="h-screen">
      <h1 className="text-2xl">CPRG 306 Web Development 2 - Assignments</h1>
      <ul>
        <li><Link className={LinkStyle} href="./week-2">week-2</Link></li>
        <li><Link className={LinkStyle} href="./week-3">week-3</Link></li>
        <li><Link className={LinkStyle} href="./week-4">week-4</Link></li>
        <li><Link className={LinkStyle} href="./week-5">week-5</Link></li>
        <li><Link className={LinkStyle} href="./week-6">week-6</Link></li>
      </ul>
    </main>
  );
}
