import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDatabase from "./routes/PokeDatabase";
import GalleryView from "./routes/views/gallery";
import ListView from "./routes/views/list";
import DetailView from "./routes/views/detail";
import "./app.css";

function App() {
  return (
    <BrowserRouter basename="/cs409_mp2">
      <Routes>
        <Route path="/" element={<PokemonDatabase />}>
          <Route index element={<GalleryView />} />
          <Route path="list" element={<ListView />} />
          <Route path="pokemon/:id" element={<DetailView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;