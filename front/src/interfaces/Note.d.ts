import ILanguage from "@/interfaces";
import { ChangeEvent } from "react";
export interface INote {
  id: number;
  note: number;
  language: ILanguage;
}

export interface INoteInfos {
  note: number | null;
  languageId: number | null;
}

export interface INoteInput {
  languages: ILanguage[];
  handleChangeNote: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  noteIndex: number;
}

export interface INewNotes{
    [key: string] : any;
    notes: INotes[];
}
// {
//     "id": 1,
//     "note": 10,
//     "language": {
//         "id": 2,
//         "label": "JS"
//     }
// }
// ]
