import Link from "next/link";
import WebResume from "./components/WebResume";
import { inter } from "./fonts";
import Image from "next/image";

export default function Home() {
  return (
    <div className={inter.className}>
      <div className="bg-slate-900 bg- py-[40px] min-h-dvh">
        <div className="text-center mb-20 flex flex-col gap-4">
          <h1 className="mb-4 text-slate-300 text-4xl font-semibold">
            Yash Mahesh Burshe
          </h1>
          <div className="flex gap-4 justify-center">
            <Link target="_blank" href="https://medium.com/@yburshe"><Image src="/medium.svg" width={36} height={36} alt="Medium Logo" /></Link>
            <Link target="_blank" href="https://github.com/yashburshe"><Image className="bg-white rounded-md p-0.5" src="/github.svg" width={36} height={36} alt="GitHub Logo" /></Link>
            <Link target="_blank" href="https://github.com/yashburshe"><Image src="/linkedin.png" width={36} height={36} alt="LinkedIn Logo" /></Link>
          </div>
          <p className="max-w-xl mx-auto text-slate-400">
            Graduate student at Northeastern University. Passionate about
            building web apps with TypeScript, React and Next.js
          </p>
        </div>
        <WebResume />
      </div>
    </div>
  );
}
