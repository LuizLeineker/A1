import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import CadastroTarefa from "./components/pages/tarefas/CadastroTarefa"; 
import ListarTarefa from  "./components/pages/tarefas/ListarTarefa"; 


function App() {
  return (
    <div id="app">
      <h1>Seja Bem Vindo!! Organize suas tarefas e deixe sua vida em ordem</h1>
      <BrowserRouter>
      <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pages/tarefas/CadastroTarefa">Cadastro Tarefa</Link>
            </li>
            <li>
              <Link to="api/tarefas/listar">Listar Tarefa</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/pages/tarefas/CadastroTarefa"
            element={<CadastroTarefa/>}
          />
           <Route
            path="api/tarefas/listar"
            element={<ListarTarefa />}
          />
        </Routes>
      
       </BrowserRouter>
    </div>
  );
}


export default App;