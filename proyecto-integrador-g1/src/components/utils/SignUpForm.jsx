import React, {useState} from 'react';
import {Formulario, Columna, ColumnaCentral, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from './_elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from './../_input/Input';

import axios from 'axios';

import "./signUpForm.css";
import { URL_BASE } from './services/peticionesFetch';


export const SignUpForm = () => {
	const [nombre, cambiarNombre] = useState({campo: '', valido: null});
	const [apellido, cambiarApellido] = useState({campo: '', valido: null});
	const [email, cambiarEmail] = useState({campo: '', valido: null});
  const [contrasena, cambiarContrasena] = useState({campo: '', valido: null});
	const [contrasena2, cambiarContrasena2] = useState({campo: '', valido: null});
	const [ciudad, cambiarciudad] = useState({campo: '', valido: null});
	const [formularioValido, cambiarFormularioValido] = useState(null);
  const [mensajeFormularioInvalido, cambiarMensajeFormularioInvalido] = useState('Por favor rellena correctamente el formulario.');

	const expresiones = {
		nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    contrasena: /^.{4,12}$/, // 4 a 12 digitos.
		ciudad: /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
	}

	const validarPassword2 = () => {
		if(contrasena.campo.length > 0){
			if(contrasena.campo !== contrasena2.campo){
				cambiarContrasena2((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				cambiarContrasena2((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}

  const instance = axios.create({
    baseURL: URL_BASE,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });

	const onSubmit = async (e) => {
		e.preventDefault();

		if(
			nombre.valido === 'true' &&
			apellido.valido === 'true' &&
			email.valido === 'true' &&
      contrasena.valido === 'true' &&
			contrasena2.valido === 'true' &&
			ciudad.valido === 'true'
		){
			cambiarFormularioValido(true);
      cambiarMensajeFormularioInvalido('Por favor rellena correctamente el formulario.');

			cambiarNombre({campo: '', valido: null});
			cambiarApellido({campo: '', valido: null});
			cambiarEmail({campo: '', valido: null});
			cambiarContrasena({campo: '', valido: null});
			cambiarContrasena2({campo: '', valido: 'null'});
			cambiarciudad({campo: '', valido: null});

      try {
        const obtenerRolId = await instance.get('/roles/1')
        console.log(obtenerRolId.data);
        
        const newUser = {
          nombre: nombre.campo,
          apellido: apellido.campo,
          email:email.campo,
          contrasena: contrasena.campo,
          ciudad: ciudad.campo,
          roles_id: obtenerRolId.data.id // id:1 nombre: Cliente
        };
        console.log(newUser);
        const response = await instance.post('/user/signUp', newUser);

        console.log(response.data);
        localStorage.setItem('jwt', response.data.jwt);

        if(response.data.jwt != null){
          window.location.href = "/";
        }
    
      } catch (error) {
        cambiarFormularioValido(false);
        cambiarMensajeFormularioInvalido('Correo en uso. Por favor elije otro correo.');

        console.error(error);
      }

		} else {
			cambiarFormularioValido(false);
		}
	}

	return (
			<>
        <h2>Registro</h2>
        <Formulario action="" onSubmit={onSubmit}>
        <Columna>
          <Input
            estado={nombre}
            cambiarEstado={cambiarNombre}
            tipo="text"
            label="Nombre"
            placeholder="John Doe"
            name=""
            leyendaError="El nombre solo puede contener letras y espacios."
            expresionRegular={expresiones.nombre}
          />
        </Columna>

        <Columna>
          <Input
            estado={apellido}
            cambiarEstado={cambiarApellido}
            tipo="text"
            label="Apellido"
            placeholder="Smith Smithe"
            name=""
            leyendaError="El apellido solo puede contener letras y espacios."
            expresionRegular={expresiones.apellido}
          />
        </Columna>

        <Columna>
          <Input
            estado={email}
            cambiarEstado={cambiarEmail}
            tipo="email"
            label="Correo Electrónico"
            placeholder="john@email.com"
            name="email"
            leyendaError="El email solo puede contener letras, numeros, puntos, guiones y guion bajo."
            expresionRegular={expresiones.email}
          />
        </Columna>        

        <Columna>
          <Input
            estado={contrasena}
            cambiarEstado={cambiarContrasena}
            tipo="contrasena"
            label="Contraseña"
            name="password1"
            leyendaError="La contraseña tiene que ser de 4 a 12 dígitos."
            expresionRegular={expresiones.contrasena}
          />
        </Columna>				

        <Columna>
          <Input
            estado={contrasena2}
            cambiarEstado={cambiarContrasena2}
            tipo="contrasena"
            label="Repetir Contraseña"
            name="contrasena2"
            leyendaError="Ambas contraseñas deben ser iguales."
            funcion={validarPassword2}
          />
        </Columna>				
				
        <Columna>
          <Input
            estado={ciudad}
            cambiarEstado={cambiarciudad}
            tipo="text"
            label="Ciudad"
            placeholder="Medallo"
            name="ciudad"
            leyendaError="La ciudad solo puede contener letras y espacios."
            expresionRegular={expresiones.ciudad}
          />
        </Columna>				

        <ColumnaCentral>
          {
            formularioValido === false && <MensajeError>
              <p>
                <FontAwesomeIcon icon={faExclamationTriangle}/>
                <b>Error:</b> {mensajeFormularioInvalido}
              </p>
            </MensajeError>
          }
          </ColumnaCentral>

          <ColumnaCentral>
            <ContenedorBotonCentrado>
              <Boton type="submit">Enviar</Boton>
              {formularioValido === true && <MensajeExito>Verificando formulario enviado!</MensajeExito>}
            </ContenedorBotonCentrado>
          </ColumnaCentral>	
        </Formulario>
      </>      
	);
};
