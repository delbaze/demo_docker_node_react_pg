import { INote } from "@/interfaces";
export interface ICardWilderProps {
  id: number;
  firstName: string;
  getWilders: () => void;
  notes: INote[];
}
