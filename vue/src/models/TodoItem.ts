import { DateTime } from "luxon";

export interface TodoItem {
	content: string;
	isDone: boolean;
	created: DateTime;
	completed?: DateTime;
}