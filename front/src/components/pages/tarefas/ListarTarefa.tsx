import { useEffect, useState } from "react";
import { Tarefa } from "../../../models/Tarefa";
import { Categoria } from "../../../models/Categoria";
import { useParams } from "react-router-dom";
import axios from "axios";
import React from "react";


function ListaTarefa() {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  
    useEffect(() => {
      fetch("http://localhost:5000/api/tarefas/listar")
        .then((resposta) => {
          return resposta.json();
        })
        .then((produtos) => {
          setTarefas(produtos);
        });
    });
  
    return (
        <div className="container">
          <h1>Lista de Produtos</h1>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Titulo</th>
                <th>Descricao</th>
                <th>Categoria</th>
                <th>Criado Em</th>
              </tr>
            </thead>
            <tbody>
              {tarefas.map((tarefa) => (
                <tr key={tarefa.tarefaId}>
                  <td>{tarefa.tarefaId}</td>
                  <td>{tarefa.titulo}</td>
                  <td>{tarefa.descricao}</td>
                  <td>{tarefa.categoria?.nome}</td>
                  <td>{tarefa.criadoEm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  
   
  }
  
  export default ListaTarefa;
  