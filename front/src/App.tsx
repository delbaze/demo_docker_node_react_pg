import { NavLink, Outlet } from "react-router-dom";
// import CreateWilder from "./pages/CreateWilder";


function App() {
  return (
    <div>
      <nav>
        <NavLink to={"/"}>Accueil</NavLink>
        <NavLink to={"/create"}>Créer un Wilder</NavLink>
      </nav>
      {/* <CreateWilder /> */}
      <Outlet />
    </div>
  );
}

export default App;
