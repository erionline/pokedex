import { BrowserRouter, Routes, Route } from "react-router-dom";
import { render } from "react-dom";
import Home, { List } from "./App";

const rootElement = document.getElementById("root");

render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
