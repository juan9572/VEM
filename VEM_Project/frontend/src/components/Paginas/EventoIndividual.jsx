import React from 'react';
import {useEffect, useState} from 'react';
import {Room,Star} from "@material-ui/icons";
import { useForm, Controller } from "react-hook-form";

import axios from 'axios';

function EventoIndividual() {
    const myStorage = window.localStorage;
  const agregarComentario = async (data) => { //Crear un nuevo comentario en el evento
    const newComentario = await{ //Se crea el pin
        username:myStorage.getItem("user"),
        mensaje:"funcionemalparidohpta",
        rating:5,
        tituloEvento:"Nose"
    };
    
    try{
      const res = await axios.post("/api/publicitarios/comentar",newComentario); //Se llama a la Api para que los guarde
      console.log(res);
    }catch(err){ 
      console.log(err);
    }};
    const defaultValues = {
        username: "",
        password: ""
      };
    const { handleSubmit } = useForm({
        mode: 'all',
        reValidateMode: 'onSubmit',
        shouldFocusError: false,
        defaultValues,
      });
    return(
        <div className="container-star">
            {Array(5).fill(<Star className="star"/>)}
              <form onSubmit={handleSubmit((data) => agregarComentario(data))}>
                <label>Comentario</label>
                <textarea placeholder="Comentario" id="comentario"/>
                <label>Puntaje</label>
                <select id="rating">
                  <option defaultValue value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
                <button className="submitButton" type="submit">Comentar</button>
              </form>
            </div>

    );
    
}

export default EventoIndividual;