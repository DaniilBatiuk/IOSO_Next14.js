import Svg from "@/../public/404.svg";
import Button from "@/components/UI/Button/Button";
import styles from "@/styles/Error.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className={styles.error__container}>
      <div className={styles.error__left}>
        <h1 className={styles.error__title}>404</h1>
        <h2 className={styles.error__subtitle}>Page not found</h2>
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      </div>
      <div className={styles.error__right}>
        <Image src={Svg.src} alt="Icon" width={663} height={468} />
      </div>
    </section>
  );
}
