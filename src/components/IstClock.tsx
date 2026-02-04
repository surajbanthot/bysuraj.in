"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

type IstClockProps = {
  className?: string;
  id?: string;
};

export default function IstClock({ className, id }: IstClockProps) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const timeString = formatter.format(now);

  const istHour = parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      hour12: false,
    }).format(now)
  );

  let emoji = "";
  if (istHour >= 9 && istHour < 17) {
    emoji = "👨‍💻";
  } else if (istHour >= 23 || istHour < 6) {
    emoji = "😴";
  }

  return (
    <time
      id={id}
      className={className}
      dateTime={now.toISOString()}
      suppressHydrationWarning
    >
      {timeString} IST {emoji}
    </time>
  );
}
