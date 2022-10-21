import "./CardWilder.css";
import logo from "./person.png";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import {ICardWilderProps} from "../interfaces/CardWilder.d"
// import { ICardWilderProps } from "@/interfaces";
function CardWilder({ id, firstName, getWilders, notes }: ICardWilderProps) {
  const handleDelete = () => {
    axios
      .delete("/wilders/delete", {
        data: {
          id,
        },
      })
      .then((response) => {
        toast(response.data.message, {
          type: response.data.success ? "success" : "error",
        });
        // getWilders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="card">
      <div className="cardImage">
        <img src={logo} />
      </div>
      <div className="cardTitle">
        <h4>{firstName}</h4>
      </div>
      <div className="cardDescription">description(à faire)</div>
      <div className="cardLanguages">
        <h4>Langages</h4>
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              {n.language.label}: {n.note}
            </li>
          ))}
        </ul>
      </div>
      <Link to={`/edit/${id}`}>Editer</Link>
      <button onClick={handleDelete}>Supprimer</button>
    </div>
  );
}

export default CardWilder;
