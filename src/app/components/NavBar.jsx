import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.jpg";
import style from "../styles/nav.module.css";
export default function NavBar() {
  return (
    <nav>
      <div className={style.nav_container}>
        <div>
          <Link href={"/pages/home"}>
            <Image src={Logo} className={style.logo} alt="logo" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
