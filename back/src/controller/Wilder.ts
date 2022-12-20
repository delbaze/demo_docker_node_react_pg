import { Repository } from "typeorm";
import Wilder from "../entity/Wilder";
import dataSource from "../lib/datasource";
import * as dotenv from "dotenv";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
dotenv.config();

import {
  IWilderAssignNote,
  IWilderController,
  IWilderInfos,
  IWilderUpdateInfos,
} from "./interfaces.d";

class WilderController implements IWilderController {
  db: Repository<Wilder>;
  constructor() {
    this.db = dataSource.getRepository("Wilder");
  }
  async listWilders() {
    return await this.db //list des wilders avec notes
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .getMany();
    // return await this.db.find(); //liste des wilders sans notes
  }

  //récupérer 1 wilder en particulier (à partir de son ID)

  async findWilder(id: string | number) {
    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .where("wilder.id= :id", { id })
      .getOne();
  }
  async findWilderByEmail(email: string) {
    return await this.db
      .createQueryBuilder("wilder")
      .leftJoinAndSelect("wilder.notes", "note")
      .leftJoinAndSelect("note.language", "language")
      .where("wilder.email= :email", { email })
      .getOne();
  }

  async createWilder({
    email,
    password,
    first_name,
    last_name,
    age,
  }: IWilderInfos) {
    //1 ere methode avec create
    const hash = bcrypt.hashSync(password, 10);
    let wilder = this.db.create({
      email,
      password: hash,
      first_name,
      last_name,
      age,
    });
    return await this.db.save(wilder);

    //2eme methode avec le query builder

    // let wilder = this.db
    //   .createQueryBuilder()
    //   .insert()
    //   .values([{ first_name, last_name, age }])
    //   .execute();

    // return wilder;
  }

  async updateWilder({ first_name, last_name, age, id }: IWilderUpdateInfos) {
    return (
      this.db
        .createQueryBuilder()
        .update()
        .set({ first_name, last_name, age })
        // .where(`id=${id}`) // id=10
        .where("id= :id", { id }) // id=10
        .execute()
    );
  }

  async deleteWilder(id: number) {
    return this.db
      .createQueryBuilder()
      .delete()
      .where("id= :id", { id })
      .execute();
  }
  async login(email: string, password: string) {
    console.log('%c⧭', 'color: #aa00ff', email);
    console.log('%c⧭', 'color: #e50000', password);
    let data = { success: false, token: "" };
    try {
      let wilder = await this.findWilderByEmail(email);
      console.log('%c⧭', 'color: #00e600', wilder);
      if (!wilder) {
        throw new Error("Le wilder n'existe pas");
      }
      let match = bcrypt.compareSync(password, wilder.password);
      if (match && process.env.SECRET_KEY) {
        data.success = true;
        let token = jwt.sign({ email }, process.env.SECRET_KEY);
        data.token = token;
      }
    } catch (err: any) {
      console.log('%c⧭', 'color: #00a3cc', err);
      throw new Error(err.message);
    }
    return data;
  }

  async assignNoteLanguage({ languageId, wilderId, note }: IWilderAssignNote) {
    let languageRepository = dataSource.getRepository("Language");
    let noteRepository = dataSource.getRepository("Note");
    let language = await languageRepository.findOneBy({ id: languageId });
    if (!language) {
      throw new Error("ce langage n'existe pas");
    }
    let wilder = await this.db.findOneBy({ id: wilderId });
    if (!wilder) {
      throw new Error("ce wilder n'existe pas");
    }
    let previousNote = await noteRepository.findOneBy({ wilder, language });

    let newNote = noteRepository.save({
      ...previousNote,
      language: languageId,
      wilder: wilderId,
      note,
    });
    return newNote;
  }
}
export default WilderController;
