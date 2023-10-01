import { Markdown } from "../enums/Markdown";

export type NoteComponent = {
    name:string,
    content:string,
    markdownsymbol:Markdown,
    enclosedMarkdown:boolean,
    id:string
    children:NoteComponent[]
};