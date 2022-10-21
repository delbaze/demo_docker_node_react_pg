import axios from "axios";
import CardWilder from "./../components/CardWilder";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IWilder } from "@/interfaces";
import "./Accueil.css";
import { useQuery, useLazyQuery } from "@apollo/client";
import { LIST_WILDERS } from "../graphql/wilder.query";
function Accueil() {
  const [wilders, setWilders] = useState<IWilder[]>([]);
  const { data, error, loading, refetch } = useQuery(LIST_WILDERS);
  // const [maFonction, { data, error, loading, refetch }] = useLazyQuery(LIST_WILDERS);
  console.log(data);
  // const { loading } = useQuery(LIST_WILDERS, {
  //   onCompleted: (data) => {
  //     console.log(data);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });
  // const getWilders = (): void => {
  //   axios.get("/wilders").then((response) => {
  //     console.log(response);
  //     setWilders(response.data.wilders);
  //   });
  // };

  // useEffect(() => {
  //   getWilders();
  // }, []);
  if (loading) {
    return <div> Chargement en cours</div>;
  }
  return (
    <>
      {/* <CreateWilder getWilders={getWilders} /> */}
      <div className="cardBloc">
        {/* <button onClick={() => maFonction({})}>Lancer une requête</button> */}
        {data.listWilders?.wilders.map((wilder: IWilder) => (
          <CardWilder
            getWilders={refetch}
            key={wilder.id}
            id={wilder.id}
            firstName={wilder.first_name}
            notes={wilder.notes}
          />
        ))}
      </div>
      <ToastContainer />
    </>
  );
}
export default Accueil;
