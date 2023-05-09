import React from "react";
import { useState } from "react";
import "./form.css";


const Form = () => {
  //Aqui deberan implementar el form completo con sus validaciones

  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",    
  })

  const [validation, setValidation] = useState(false)

  /*
  Aca se valida de que el campo Name cuente con nombre 
  y cumpla con la cantidad de caracteres requeridos para ser valido
  */
  const validateName = () => {

    let nameUser = values.name.split(" ")

    if (nameUser.length < 1) return alert("Ingrese nombre")
    if (nameUser[0].length < 3 || nameUser[1].length < 3) return alert("Ingrese nombre")

    return true

  }

    /*
  Aca se valida de que el campo Surname cuente con apellido 
  y cumpla con la cantidad de caracteres requeridos para ser valido
  */
  const validateSurname = () => {

    let surnameUser = values.name.split(" ")

    if (surnameUser.length < 2) return alert("Ingrese Apellido en el campo de Surname")
    if (surnameUser[0].length < 3 || surnameUser[1].length < 3) return alert("Ingrese un apellido valido")

    return true

  }

  /*
  Aca validamos que el email contenga caracteres tales como @ y una extension valida de correo .com
  */
  const validateEmail = () => {

    let emailUser = values.email.split("@")
    if (emailUser.length < 2) return alert("Email incorrecto, debe contener una '@' y una extension valida como '.com'")

    let dotCom = emailUser[1].split(".")
    if (dotCom.length < 2) return alert("Email incorrecto, debe contener una '@' y una extension valida como '.com'")

    return true

  }
  
  // Aca analizamos los cambios que pueda tener el form para validar de ser necesario
  const handleChange = (e) => {

    const { target } = e
    const { name, value } = target

    const newValues = {
      ...values,
      [name]:value,
    }

    setValues(newValues)

  }

  // Con el boton submit se empieza la validacion de datos
  const handleSubmit = (e) => {

    e.preventDefault()

    let nameValidation = validateName()

    let emailValidation = validateEmail()

    if (nameValidation && emailValidation) {
      setValidation(true)
    }

  }

  return (
    <div className="container-formComponent">
      <form onSubmit={handleSubmit}>
        <h3 className="registro">Registrate</h3>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          name="name"
          className="input-form"
          onChange={handleChange}
        />
        <label htmlFor="surname">Apellido</label>
        <input
          type="text"
          name="surname"
          className="input-form"
          onChange={handleChange}
        />
        <label htmlFor="email">Correo</label>
        <input
          type="email"
          name="email"
          className="input-form"
          onChange={handleChange}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          className="input-form"
          onChange={handleChange}
        />
        <label htmlFor="password">Confirmación de contraseña</label>
        <input
          type="password"
          name="password"
          className="input-form"
          onChange={handleChange}
        />
        <button type="submit" className="btn-form">
          Registrarte
        </button>
      </form>
      {/* <div className="container-h3"> */}
      {/* {validation ? <h3 className="h3">Gracias por escribirnos {values.name}. En breve, un asistente se contactará lo antes posible con usted!</h3> : ""} */}
      {/* </div> */}
    </div>
  );
};

export default Form;