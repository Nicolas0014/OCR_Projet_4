import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="absolute left-20 top-20 z-10">
      <Link href="/">
        <Image src="/images/Logo.png" width={330} height={40} alt="Logo" />
      </Link>
    </header>
  );
}
