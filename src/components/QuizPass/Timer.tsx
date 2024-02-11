"use client";
import styles from "@/styles/QuizPass.module.scss";
import { useNow } from "@/utils/hooks";
import { FormEvent, useEffect, useState } from "react";

type TimerProp = {
  duration: string;
  onSubmit: (e?: FormEvent, isTimerFinish?: boolean) => Promise<void>;
};

export const Timer: React.FC<TimerProp> = ({ duration, onSubmit }: TimerProp) => {
  const [startAt, setStartAt] = useState<number | null>(null);

  const durationDate = new Date(duration);
  const durationHours = durationDate.getHours();
  const durationMinutes = durationDate.getMinutes();
  const now = useNow(1000, startAt);

  if (isNaN(durationDate.getTime())) {
    console.error("Invalid date format for duration:", duration);
    return null;
  }

  const fromStart = now - (startAt ?? now);

  const timeLeft = Math.max(
    0,
    durationHours * 60 * 60 * 1000 + durationMinutes * 60 * 1000 - fromStart,
  );

  if (timeLeft === 0) {
    setStartAt(null);
    onSubmit(undefined, true);
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  useEffect(() => {
    if (!startAt) {
      setStartAt(Date.now());
    }
  }, []);

  return (
    <div className={styles.left__time}>
      {hours.toString().padStart(2, "0")}:{minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
};
