import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

function CadastroTarefa(){
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setCategoriaId] = useState("");


    useEffect(() => {
      axios
        .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
        .then((resposta) => {
          setCategorias(resposta.data);
        });
    });
  
    function CreateTarefa(e: any) {
      e.preventDefault();
  
      const tarefa: Tarefa = {
        titulo: titulo,
        descricao: descricao,
        categoriaId: categoriaId,
      };
  
      fetch("http://localhost:5000/api/tarefas/cadastrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tarefa),
      })
        .then((resposta) => {
          return resposta.json();
        })
        .then((produto) => {
          console.log("Tarefa Registrada! ", tarefa);
        });
    }

    return (
      <div id="cadastrar_produto" className="container">
      <h1>Cadastrar Produto</h1>
      <form onSubmit={CadastroTarefa}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            onChange={(e: any) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            onChange={(e: any) => setDescricao(e.target.value)}
          />
        </div>


        <div>
          <label htmlFor="Categoria">Categorias</label>
          <select
            onChange={(e: any) => setCategoriaId(e.target.value)}
          >
            {categorias.map((categoria) => (
              <option
                value={categoria.categoriaId}
                key={categoria.categoriaId}
              >
                {categoria.nome}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Cadastrar Produto</button>
      </form>
    </div>
    );
    
}

export default CadastroTarefa;