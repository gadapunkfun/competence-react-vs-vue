import { DateTime } from "luxon";

export interface TodoItem {
  id: string;
  content: string;
  isDone: boolean;
  created: DateTime;
  completed?: DateTime;
}
