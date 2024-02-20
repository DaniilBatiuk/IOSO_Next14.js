import Link from "next/link";

import { ICONS } from "@/utils/config/icons";

import styles from "@/styles/Error.module.scss";

import { Button } from "@/components";

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
      <div className={styles.error__right}>{ICONS.Error()}</div>
    </section>
  );
}
