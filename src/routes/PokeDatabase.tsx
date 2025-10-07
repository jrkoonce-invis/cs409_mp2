import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router';

const PokemonDatabase = () => {
  const location = useLocation();
  return (
    <div id="main-content">
      <h1>The Original 151 Pokémon Database</h1>
      <div id="view-selector">
        <Link to="/">
          <button disabled={location.pathname === "/"}>Gallery View</button>
        </Link>
        <Link to="/list">
          <button disabled={location.pathname === "/list"}>List View</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default PokemonDatabase;
