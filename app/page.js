import Image from "next/image";
import Link from "next/link";

export default function Home() {


  const LinkStyle ="underline text-cyan-600 hover:text-cyan-300"

  return (
    <main className="h-screen">
      <h1 className="text-2xl">CPRG 306 Web Development 2 - Assignments</h1>
      <ul>
        <li><Link className={LinkStyle} href="./week-2">week-2</Link></li>
      </ul>
    </main>
  );
}
