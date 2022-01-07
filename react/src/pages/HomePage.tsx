import React from "react";
import { Link } from "react-router-dom";
import TodoList from "../components/TodoList";
import { aboutUrl } from "../routes/paths";

const HomePage = () => {
  return (
    <main>
      <header>
        <h1>This is the home page</h1>
        <Link to={aboutUrl}>About page</Link>
      </header>
      <TodoList />
    </main>
  );
};

export default HomePage;
