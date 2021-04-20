import React, { useContext } from "react";
import Application from "./Components/Application";
import UserProvider from "./Providers/UserProvider";

function App() {
  return (
    <UserProvider style={{height: "100%"}}>
      <Application />
    </UserProvider>
  );
}
export default App;