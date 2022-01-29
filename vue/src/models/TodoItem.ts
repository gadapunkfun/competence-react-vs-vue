export class TodoItem {
    content: string;
    isDone: boolean;
    created: string;
    completed?: string;
    constructor(content: string) {
        this.content = content;
        this.isDone = false;
        this.created = new Date().toLocaleDateString("ja-JP", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "2-digit"
        });
    }
}