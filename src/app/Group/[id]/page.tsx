"use client";
import Complete from "@/../public/Complete.svg";
import Modal from "@/components/UI/Modal/Modal";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/Group.module.scss";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function darkenColor(color: string, percent: number) {
  // Convert hex to RGB
  const hex = color.substring(1);
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Darken each component
  const darkenedR = Math.floor(r * (1 - percent / 100));
  const darkenedG = Math.floor(g * (1 - percent / 100));
  const darkenedB = Math.floor(b * (1 - percent / 100));

  // Convert back to hex
  const darkenedHex =
    "#" + (darkenedR * 65536 + darkenedG * 256 + darkenedB).toString(16).padStart(6, "0");

  return darkenedHex;
}

function stringAvatar(name: string) {
  const bgColor = stringToColor(name);
  const textColor = darkenColor(bgColor, 40); // Adjust the percentage as needed

  return {
    sx: {
      bgcolor: bgColor,
      color: textColor,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const Group: React.FC = () => {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<string>("Group");
  const [activeModal, setActiveModal] = useState(false);
  const [age, setAge] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  const handleRedirect = () => {
    router.push("/QuizPass/1");
  };

  return (
    <ThemeWrapper>
      <div className={styles.group__container}>
        <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="600px">
          <div className={styles.modal__head}>
            <h2 className={styles.modal__title}>Pass the quiz?</h2>
            <div className={styles.modal__text}>Attempts left: 2"</div>
          </div>
          <div className={styles.modal__buttons}>
            <button className={styles.modal__button__cancel} onClick={() => setActiveModal(false)}>
              Cancel
            </button>
            <button className={styles.modal__button__activate} onClick={handleRedirect}>
              Quiz
            </button>
          </div>
        </Modal>
        <div className={styles.group__title}>Quiz for english level</div>
        <div className={styles.left__buttons}>
          <button
            className={activeMenu === "Group" ? styles.left__button__active : styles.left__button}
            onClick={() => setActiveMenu("Group")}
          >
            Group
          </button>
          <button
            className={
              activeMenu === "Statistic" ? styles.left__button__active : styles.left__button
            }
            onClick={() => setActiveMenu("Statistic")}
          >
            Statistic
          </button>
        </div>
        <div className={styles.group__main}>
          {activeMenu === "Group" ? (
            <>
              <section className={styles.left}>
                <div className={styles.left__section}>
                  <div className={styles.left__section__title}>
                    Create group 123 in progress Create group 123 in progress{" "}
                  </div>
                  <div className={styles.left__section__body}>
                    <div
                      className={styles.left__section__test}
                      onClick={() => setActiveModal(true)}
                    >
                      <div className={styles.left__section__test__title}>Quiz in 1 mun</div>
                      <Image src={Complete.src} alt="Icon" width={35} height={35} />
                    </div>
                    <div
                      className={styles.left__section__test}
                      onClick={() => setActiveModal(true)}
                    >
                      <div className={styles.left__section__test__title}>Quiz in 1 mun</div>
                    </div>
                    <div
                      className={styles.left__section__test}
                      onClick={() => setActiveModal(true)}
                    >
                      <div className={styles.left__section__test__title}>
                        Quiz in 1 mun Create group 123 in progress Create group 123 in progress
                        Create group 123 in Create group 123 in progress
                      </div>
                      <Image src={Complete.src} alt="Icon" width={35} height={35} />
                    </div>
                  </div>
                </div>
                <div className={styles.left__section}>
                  <div className={styles.left__section__title}>
                    Create group 123 in progress Create group 123 in progress{" "}
                  </div>
                  <div className={styles.left__section__body}>
                    <div className={styles.left__section__test}>
                      <div className={styles.left__section__test__title}>Quiz in 1 mun</div>
                      <Image src={Complete.src} alt="Icon" width={35} height={35} />
                    </div>
                    <div className={styles.left__section__test}>
                      <div className={styles.left__section__test__title}>Quiz in 1 mun</div>
                    </div>
                    <div className={styles.left__section__test}>
                      <div className={styles.left__section__test__title}>
                        Quiz in 1 mun Create group 123 in progress Create group 123 in progress
                        Create group 123 in Create group 123 in progress
                      </div>
                      <Image src={Complete.src} alt="Icon" width={35} height={35} />
                    </div>
                  </div>
                </div>
                <div className={styles.left__section}>
                  <div className={styles.left__section__title}>
                    Create group 123 in progress Create group 123 in progress{" "}
                  </div>
                  <div className={styles.left__section__body}>
                    <div className={styles.left__section__test}>
                      <div className={styles.left__section__test__title}>
                        Quiz in 1 mun Create group 123 in progress Create group 123 in progress
                        Create group 123 in Create group 123 in progress
                      </div>
                      <Image src={Complete.src} alt="Icon" width={35} height={35} />
                    </div>
                  </div>
                </div>
              </section>

              <section className={styles.right}>
                <div className={styles.right__item}>
                  <div className={styles.right__title}>Summary</div>
                  <div className={styles.right__block__text}>
                    <div className={styles.right__text}>20 sections</div>
                    <div className={styles.right__text}>26 quizzes</div>
                    <div className={styles.right__text}>6 managers</div>
                    <div className={styles.right__text}>1241 participants</div>
                  </div>
                </div>
                <div className={styles.right__item}>
                  <div className={styles.right__title}>Participants</div>
                  <div className={styles.right__manager}>Managers</div>
                  <div className={styles.right__block}>
                    <Avatar {...stringAvatar("Kent Dodds")} />
                    <Avatar {...stringAvatar("Jed Watson")} />
                    <Avatar {...stringAvatar("Tim Neutkens")} />
                    <Avatar {...stringAvatar("Daniil Batiuk")} />
                    <Avatar {...stringAvatar("Olex Temch")} />
                    <Avatar {...stringAvatar("Kioto Miva")} />
                    <Avatar {...stringAvatar("Melli Dava")} />
                    <Avatar {...stringAvatar("Kot Leopold")} />
                    <Avatar {...stringAvatar("Kira Mi")} />
                  </div>
                  <div className={styles.right__participants}>Participants</div>
                  <div className={styles.right__block}>
                    <Avatar {...stringAvatar("Kent Dodds")} />
                    <Avatar {...stringAvatar("Jed Watson")} />
                    <Avatar {...stringAvatar("Tim Neutkens")} />
                    <Avatar {...stringAvatar("Daniil Batiuk")} />
                    <Avatar {...stringAvatar("Olex Temch")} />
                    <Avatar {...stringAvatar("Kioto Miva")} />
                    <Avatar {...stringAvatar("Melli Dava")} />
                    <Avatar {...stringAvatar("Kot Leopold")} />
                    <Avatar {...stringAvatar("Kira Mi")} />
                    <Avatar {...stringAvatar("Koki Moli")} />
                    <Avatar {...stringAvatar("Dali Namisa")} />
                    <Avatar {...stringAvatar("Gsatr Gasje")} />
                    <Avatar {...stringAvatar("Rsadf Ldfnb")} />
                    <Avatar {...stringAvatar("Ofsm Kima")} />
                    <Avatar {...stringAvatar("Lieea Naritave")} />
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className={styles.statistic}>
              <div className={`${styles.statistic__form}`}>
                <form className={`${styles.form}`}>
                  <TextField id="standard-basic" label="Find by name" variant="standard" />
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Status"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">Difficulty</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Difficulty"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                    <InputLabel id="demo-simple-select-standard-label">Filter by name</InputLabel>
                    <Select
                      labelId="demo-simple-select-standard-label"
                      id="demo-simple-select-standard"
                      value={age}
                      onChange={handleChange}
                      label="Filter by name"
                    >
                      <MenuItem value={10}>Ten</MenuItem>
                      <MenuItem value={20}>Twenty</MenuItem>
                      <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </div>
              <div className={styles.statistic__main_2}>
                <table className={styles.statistic__table}>
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Quiz name</th>
                      <th>Attempts</th>
                      <th>Status</th>
                      <th>Correctly</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.item}>
                      <td className={styles.item__avatar}>
                        <Avatar {...stringAvatar("Kent Dodds")} />
                      </td>
                      <td className={styles.item__title}>Daniil Batiuk</td>
                      <td className={styles.item__title}>Daniil Batiuk</td>
                      <td className={styles.item__attempts}>1</td>
                      <td>
                        <div className={`${styles.item__status_open}`}>Passed</div>
                      </td>
                      <td className={styles.item__data}>55.55%</td>
                      <td>
                        <button className={styles.item__button}>View result</button>
                      </td>
                    </tr>
                    <tr className={styles.item}>
                      <td className={styles.item__avatar}>
                        <Avatar {...stringAvatar("Jed Watson")} />
                      </td>
                      <td className={styles.item__title}>Regular Expressio</td>
                      <td className={styles.item__title}>
                        Regular Expression Matching Regular Expression Matching
                      </td>
                      <td className={styles.item___attempts}>2</td>
                      <td>
                        <div className={`${styles.item__status_close}`}>Denied</div>
                      </td>
                      <td className={styles.item__data}>22.55%</td>
                      <td>
                        <button className={styles.item__button}>View result</button>
                      </td>
                    </tr>
                    <tr className={styles.item}>
                      <td className={styles.item__avatar}>
                        <Avatar {...stringAvatar("Kira Mi")} />
                      </td>
                      <td className={styles.item__title}>Olex Milka</td>
                      <td className={styles.item__title}>
                        Regular Expression Matching Regular Expression Matching
                      </td>
                      <td className={styles.item__attempts}>0</td>
                      <td>
                        <div className={`${styles.item__status_close}`}>Denied</div>
                      </td>
                      <td className={styles.item__data}>75.14%</td>
                      <td>
                        <button className={styles.item__button}>View result</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
      
    </ThemeWrapper>
  );
};
export default Group;
