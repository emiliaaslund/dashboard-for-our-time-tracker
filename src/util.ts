import dayjs from "dayjs";

export const calcTotalTime = (timelogs: TimeLog[]) =>
  timelogs
    .map((time: any) => {
      const startTimestamp = time.startDate + "T" + time.startTime;
      const endTimestamp = time.endDate + "T" + time.endTime;
      const diff = dayjs(endTimestamp).diff(dayjs(startTimestamp));
      // console.log(startTimestamp, endTimestamp, diff);
      return diff;
    })
    .reduce((diff, curr) => diff + curr, 0);
