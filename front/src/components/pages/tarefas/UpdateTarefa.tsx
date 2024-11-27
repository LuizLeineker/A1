import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";

function UpdateTarefa(){
    const { id } = useParams();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [categoriaId, setCategoriaId] = useState("");

    useEffect(() => {
        if (id) {
          axios
            .get<Tarefa>(
              `http://localhost:5000/tarefas/alterar/id`
            )
            .then((resposta) => {
              setTitulo(resposta.data.titulo);
              setDescricao(resposta.data.descricao);
              buscarCategorias();
            });
        }
      }, []);
    
      function buscarCategorias() {
        axios
          .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
          .then((resposta) => {
            setCategorias(resposta.data);
          });
      }
    
      function updateTarefa(e: any) {
        e.preventDefault();
    
        const tarefa: Tarefa = {
          titulo: titulo,
          descricao: descricao,
          categoriaId: categoriaId,
        };
    
        axios
          .put(`http://localhost:5000/tarefas/alterar/${id}`,  tarefa)
          .then((resposta) => {
            console.log(resposta.data);
          });
      }
    
      return (
        <div id="alterar-tarefa" className="container">
          <h1>Update Tarefa</h1>
          <form onSubmit={updateTarefa}>
            <div>
              <label htmlFor="nome">Titulo</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={titulo}
                required
                onChange={(e: any) => setTitulo(e.target.value)}
              />
            </div>
    
            <div>
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                id="descricao"
                value={descricao}
                name="descricao"
                onChange={(e: any) => setDescricao(e.target.value)}
              />
            </div>
    
            <div>
              <label htmlFor="quantidade">Categorias</label>
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



export default UpdateTarefa;