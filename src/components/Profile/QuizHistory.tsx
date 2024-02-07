import styles from "@/styles/Profile.module.scss";
import Link from "next/link";

export const QuizHistory: React.FC = () => {
  return (
    <div className={styles.profile__main_2}>
      <table className={styles.profile__table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Creator</th>
            <th>Status</th>
            <th>Correctly</th>
            <th>Deadline</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.item}>
            <td className={styles.item__title}>
              Regular Expression Matching Regular Expression Matching
            </td>
            <td className={styles.item__creator}>Daniil Batiuk</td>
            <td>
              <div className={`${styles.item__status_open}`}>Passed</div>
            </td>
            <td className={styles.item__data}>55.55%</td>
            <td className={styles.item__deadline}>Mar 15 2021</td>
            <td>
              <button className={styles.item__button}>
                <Link href="/Result/1">View result</Link>
              </button>
            </td>
          </tr>
          <tr className={styles.item}>
            <td className={styles.item__title}>Regular Expressio</td>
            <td className={styles.item__creator}>Daniil</td>
            <td>
              <div className={`${styles.item__status_close}`}>Denied</div>
            </td>
            <td className={styles.item__data}>22.55%</td>
            <td className={styles.item__deadline}>Mar 15 2021</td>
            <td>
              <button className={styles.item__button}>
                <Link href="/Result/1">View result</Link>
              </button>
            </td>
          </tr>
          <tr className={styles.item}>
            <td className={styles.item__title}>
              Regular Expression Matching Regular Expression Matching
            </td>
            <td className={styles.item__creator}>Daniil Batiuk Daniil Batiuk</td>
            <td>
              <div className={`${styles.item__status_close}`}>Denied</div>
            </td>
            <td className={styles.item__data}>75.14%</td>
            <td className={styles.item__deadline}>Mar 15 2021</td>
            <td>
              <button className={styles.item__button}>
                <Link href="/Result/1">View result</Link>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
