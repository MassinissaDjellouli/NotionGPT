import { Markdown } from "../enums/Markdown";

export type NoteComponent = {
    name:string,
    content:string,
    markdownsymbol:Markdown,
    id:string
    child:NoteComponent|undefined
};