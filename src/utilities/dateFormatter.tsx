import { isValid, parseISO } from "date-fns";

//10 Sun Sep 25 2022 15:50:57 GMT+1000 (Australian Eastern Standard Time)
export const dateFormatter = (utcDate: string) => {
  let date = parseISO(utcDate);
  if (!isValid(date)) return "invalid date";
  return (
    date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  );
};
