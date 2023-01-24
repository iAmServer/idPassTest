import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import Covid from "./pages/Covid";
import Quotes from "./pages/Quotes";
import Names from "./pages/Names";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Quotes />}></Route>
        <Route path={"/covid"} element={<Covid />}></Route>
        <Route path={"/names"} element={<Names />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
