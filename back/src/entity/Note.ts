import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Wilder from "./Wilder";

import Language from "./Language";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity("notes")
export default class Note {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field()
  note: number;

  @Field()
  @ManyToOne("Language", { eager: true, onDelete: "CASCADE" })
  @JoinColumn()
  language: Language;

  @Field(() => Wilder)
  @ManyToOne(() => Wilder, (wilder) => wilder.notes, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  wilder: Wilder;
}
