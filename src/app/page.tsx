import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import Main from "@/../public/Main3.png";
import SubMain from "@/../public/SubMain.png";
import Button from "@/components/UI/Button/Button";
import Link from "next/link";
import Svg1 from "@/../public/Icon.svg";
import Svg2 from "@/../public/Icon1.svg";
import Svg3 from "@/../public/Icon2.svg";
import { LINKS } from "@/utils/config/links";

export default function Home() {
  return (
    <>
      <div className={`${styles.home__container}`}>
        <Image
          src={Main}
          alt="MainPhoto"
          fill={true}
          priority={true}
          placeholder="blur"
          className={`${styles.main_photo}`}
        />
        <section className={`${styles.main}`}>
          <div className={`${styles.main_title}`}>IOSO online test and quiz maker</div>
          <div className={`${styles.main_subtitle}`}>
            Create, send and analyze your tests, quizzes and assessments for free with IOSO
          </div>
          <Link href={LINKS.SignUp}>
            <Button>Get started</Button>
          </Link>
        </section>
        <section className={`${styles.info}`}>
          <div className={`${styles.info__title}`}>You need to make a test?</div>
          <div className={`${styles.info__content}`}>
            <div className={`${styles.info__left}`}>
              <div className={`${styles.info__text}`}>
                Hello, test creator, you've come to the right place. Instead of printing out reams
                of paper to hand out to your staff or students, opt for an online test. A huge
                number of public tests, the opportunity to create your own and share it with
                colleagues. This and many other features are free. Plus, you can see the results in
                a few seconds and find out who is the best in the class. See for yourself.
              </div>
              <Link href={LINKS.SignUp}>
                <Button>Get started</Button>
              </Link>
            </div>
            <div className={`${styles.info__right}`}>
              <Image
                src={SubMain}
                alt="MainPhoto"
                priority={true}
                width={608}
                height={752}
                placeholder="blur"
                className={`${styles.info__photo}`}
              />
            </div>
          </div>
        </section>
        <div className={`${styles.how}`}>
          <div className={`${styles.how__title}`}>How it works</div>
        </div>
        <section className={`${styles.how__list}`}>
          <div className={`${styles.how__list__item}`}>
            <div className={`${styles.how__icon}`}>
              <Image src={Svg1.src} alt="Icon" width={200} height={200} />
            </div>
            <div className={`${styles.how__list__info}`}>
              <div className={`${styles.how__list__title}`}>Create</div>
              <div className={`${styles.how__list__text}`}>
                Quickly create great looking tests using question types and formatting options.
              </div>
            </div>
          </div>
          <div className={`${styles.how__list__item}`}>
            <div className={`${styles.how__icon}`}>
              <Image src={Svg2.src} alt="Icon" width={200} height={200} />
            </div>
            <div className={`${styles.how__list__info}`}>
              <div className={`${styles.how__list__title}`}>Publish</div>
              <div className={`${styles.how__list__text}`}>
                Tests can either be published privately to a select group or open them up to
                everyone with a single link and registration page.
              </div>
            </div>
          </div>
          <div className={`${styles.how__list__item}`}>
            <div className={`${styles.how__icon}`}>
              <Image src={Svg3.src} alt="Icon" width={200} height={200} />
            </div>
            <div className={`${styles.how__list__info}`}>
              <div className={`${styles.how__list__title}`}>Analyze</div>
              <div className={`${styles.how__list__text}`}>
                IOSO instantly marks and grades your tests. Powerful reports then allow you to
                perform in-depth analysis across all responses.
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className={`${styles.end}`}>
        <div className={`${styles.end__title}`}>IOSO</div>
        <div className={`${styles.block}`}>
          <div className={`${styles.block__info}`}>
            <div className={`${styles.block__title}`}>IOSO is a powerful online test generator</div>
            <div className={`${styles.block__subtitle}`}>
              Build your own online tests and assessments with IOSO for free
            </div>
          </div>
          <Link href={LINKS.SignUp}>
            <Button>Get started</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
