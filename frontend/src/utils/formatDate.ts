import { format } from "date-fns";

const formatDate = (time: number) => {
  return format(time, "MMM dd, yyyy");
};

export default formatDate;
