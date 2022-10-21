import Wilder from "../entity/Wilder";
import Language from "../entity/Language";
import Note from "../entity/Note";
import { UpdateResult, DeleteResult } from "typeorm";

export interface IController {
  db: Repository<Wilder | Language>;
}

export interface IWilderInfos extends Wilder {
  id?: number;
  notes?: Note[];
}
export interface IWilderUpdateInfos extends Wilder {
  id: string;
  notes?: Note[];
}

export interface IWilderAssignNote {
  languageId: number;
  wilderId: number;
  note: number;
}


export interface IInfosReturn {
    success: boolean;
    message: string;
}
export interface IWilderController extends IController {
  //   listWilders: () => Promise<Wilder[]>;
  //   findWilder: (id: number) => Promise<Wilder | null>;
  //   createWilder: (infos: IWilderInfos) => Promise<Wilder>;
  //   updateWilder: (infos: IWilderUpdateInfos) => Promise<UpdateResult>;
  //   assignNoteLanguage: (infos: IWilderAssignNote) => Promise<
  //     {
  //       language: number;
  //       wilder: number;
  //       note: number;
  //     } & ObjectLiteral
  //   >;
  //   deleteWilder: (id: number) => Promise<DeleteResult>;
}
