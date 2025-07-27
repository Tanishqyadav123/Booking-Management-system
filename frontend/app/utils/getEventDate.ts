import { monthNames } from "../constants/monthList";

export function getDate(date: string) {
  let dateData = new Date(date);
  const exactDate = dateData.getDate();
  const month = dateData.getMonth();
  const year = dateData.getFullYear();
  const time = dateData.getTime();

  return `${exactDate} ${monthNames[month]}, ${year}`;
}

export function getEventStartAndEndTime(startTime?: string, endTime?: string) {
  if (startTime) {
    startTime = new Date(startTime).toLocaleTimeString();
  }

  if (endTime) {
    endTime = new Date(endTime).toLocaleTimeString();
  }

  return { startTime, endTime };
}
