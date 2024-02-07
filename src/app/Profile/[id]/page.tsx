import ProfileSvg from "@/../public/Profile.svg";
import { ButtonsNew, PieChartActivity, ProfileList, ThemeWrapper } from "@/components";

import styles from "@/styles/Profile.module.scss";
import { FindUserById } from "@/utils/lib/actions";
import Image from "next/image";
import { Suspense } from "react";

export default async function Profile({ params }: { params: { id: string } }) {
  const user = await FindUserById(params.id);

  return (
    <ThemeWrapper>
      <div className={styles.profile__container}>
        <section className={styles.profile__info}>
          <div className={styles.info__left}>
            <Image src={ProfileSvg.src} alt="Icon" width={200} height={200} priority={true} />
            <div className={styles.info__left__text}>
              <div className={styles.info__text}>
                <div className={styles.info__name}>{user?.fullName}</div>
                <div className={styles.info__email}>{user?.email}</div>
              </div>
              <ButtonsNew id={params.id} />
            </div>
          </div>
          <div className={styles.info__right}>
            <div className={styles.info__right__item}>
              <div className={styles.info__title}>Activity</div>
              <Suspense fallback={<div className={styles.profile__blur}>Loading data...</div>}>
                <PieChartActivity />
              </Suspense>
            </div>
          </div>
        </section>
        <ProfileList id={params.id} />
      </div>
    </ThemeWrapper>
  );
}
