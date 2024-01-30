"use client";
import Modal from "@/components/UI/Modal/Modal";
import { ThemeWrapper } from "@/components/Wrappers/ThemeWrapper";
import styles from "@/styles/Group.module.scss";
import { stringAvatar } from "@/utils/lib/helpers/stringAvatar";
import { GroupsService } from "@/utils/services/group.service";
import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  TextField,
} from "@mui/material";
import { MemberStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Group = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<string>("Group");
  const [activeModal, setActiveModal] = useState(false);
  const [age, setAge] = useState("");

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["group"],
    queryFn: () => GroupsService.getGroup(params.id),
  });

  const Managers = data?.result.members.filter(member => member.status === MemberStatus.Manager);
  const Participants = data?.result.members.filter(
    member => member.status === MemberStatus.Participant,
  );

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
        <div className={styles.group__title}>
          {data ? data.result.name : <Skeleton variant="text" sx={{ height: "44px" }} />}
        </div>
        {data ? (
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
        ) : (
          <Skeleton variant="text" sx={{ height: "44px", width: "250px" }} />
        )}
        <div className={styles.group__main}>
          {activeMenu === "Group" ? (
            <>
              {data ? (
                <section className={styles.left}>
                  {data.result.sections.map((section, index) => (
                    <div className={styles.left__section} key={index}>
                      <div className={styles.left__section__title}>{section.name}</div>
                      <div className={styles.left__section__body}>
                        {section.quizzes.map((quiz, index) => (
                          <div
                            key={index}
                            className={styles.left__section__test}
                            onClick={() => setActiveModal(true)}
                          >
                            <div className={styles.left__section__test__title}>{quiz.name}</div>
                            {/* <Image src={Complete.src} alt="Icon" width={35} height={35} /> */}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </section>
              ) : (
                <Skeleton variant="rectangular" height={500} width={1000} />
              )}
              <section className={styles.right}>
                {data ? (
                  <>
                    <div className={styles.right__item}>
                      <div className={styles.right__title}>Summary</div>
                      <div className={styles.right__block__text}>
                        <div className={styles.right__text}>
                          {data.result.sections.length} sections
                        </div>
                        <div className={styles.right__text}>
                          {data.result.sections.reduce((acc, section) => {
                            return acc + section.quizzes.length;
                          }, 0)}
                          quizzes
                        </div>
                        <div className={styles.right__text}>{Managers?.length} managers</div>
                        <div className={styles.right__text}>
                          {Participants?.length} participants
                        </div>
                      </div>
                    </div>
                    <div className={styles.right__item}>
                      <div className={styles.right__title}>Participants</div>
                      <div className={styles.right__manager}>Managers</div>
                      <div className={styles.right__block}>
                        {Managers?.map((manager, index) => (
                          <Avatar key={index} {...stringAvatar(manager.user.fullName)} />
                        ))}
                      </div>
                      <div className={styles.right__participants}>Participants</div>
                      <div className={styles.right__block}>
                        {Participants?.map((participants, index) => (
                          <Avatar key={index} {...stringAvatar(participants.user.fullName)} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Skeleton variant="rectangular" height={500} />
                )}
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
