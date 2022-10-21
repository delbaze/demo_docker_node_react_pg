import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import NoteInput from "../components/NoteInput";
import { useParams, useNavigate } from "react-router-dom";
import { ILanguage, INewNotes, INoteInfos } from "@/interfaces";
function CreateWilder() {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    age: "",
  });

  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [notes, setNotes] = useState<INoteInfos[]>([]); //{ note: 3, languageId: 1}
  const canBeSubmit = () => {
    return !state.first_name || !state.last_name || !state.age;
  };
  useEffect(() => {
    if (id) {
      axios
        .get(`/wilders/${id}`)
        .then((response) => {
          console.log(response);
          if (response.data.success) {
            setState(response.data.wilder);
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status === 404) {
            toast("Ce wilder n'existe pas", { type: "error" });
          }
        });
    } else {
      setState({
        first_name: "",
        last_name: "",
        age: "",
      });
    }
    axios.get("/languages").then((response) => {
      setLanguages(response.data.languages);
    });
  }, [id]);

  const handleSubmit = (e: FormEvent) => {
    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //On stoppe le comportement initial du onSubmit
    if (state.first_name && state.last_name && state.age) {
      if (id) {
        //edition
        axios
          .patch(`/wilders/update/${id}`, state)
          .then((response) => {
            console.log(response);
            if (response.data.wilder.affected !== 0) {
              navigate("/", { replace: true });
            } else {
              console.log("afficher une erreur");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("CREATION", id);
        axios
          .post("/wilders/create", state)
          .then(function (response) {
            console.log(response);
            toast(response.data.message, {
              type: response.data.success ? "success" : "error",
            });
            // e.target.reset(); // on vide les champs du formulaire
            setState({ first_name: "", last_name: "", age: "" });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name; //first_name
    let value = e.target.value; //
    setState({ ...state, [name]: value });
  };

  const addNote = () => {
    setNotes([...notes, { note: null, languageId: null }]);
  };

  const handleChangeNote = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let value = e.target.value;
    let noteIndex = e.target.dataset.noteindex;
    let name = e.target.name;

    let newNotes: INewNotes = { notes: [...notes] };
    if (noteIndex) {
      newNotes[noteIndex][name] = value;
      setNotes(newNotes.notes);
    }
  };

  useEffect(() => {
    console.log("DEPUIS USEEFFECT", notes);
  }, [notes]);

  return (
    <div>
      <form onSubmit={handleSubmit} action="/">
        <div>
          <label htmlFor="first_name">Nom du wilder</label>
          <input
            name="first_name"
            onChange={handleChange}
            required
            value={state.first_name}
          />
        </div>
        <div>
          <label htmlFor="last_name">Prénom du wilder</label>
          <input
            name="last_name"
            onChange={handleChange}
            required
            value={state.last_name}
          />
        </div>
        <div>
          <label htmlFor="age">Age du wilder</label>
          <input
            name="age"
            type="number"
            onChange={handleChange}
            required
            value={state.age}
          />
          <button type="button" onClick={addNote}>
            Ajouter une note
          </button>
          {notes.map((n, index) => (
            <NoteInput
              languages={languages}
              key={index}
              noteIndex={index}
              handleChangeNote={handleChangeNote}
            />
          ))}
        </div>

        <button type="submit" disabled={canBeSubmit()}>
          Ajouter
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default CreateWilder;
