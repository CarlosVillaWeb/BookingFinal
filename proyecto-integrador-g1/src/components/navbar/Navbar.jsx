import "./navbar.css"

const Navbar = () => {
  // Funcion que te redirecciona a la pestaña de registro
  const signUpRedirect = () =>{
    window.location.href="/signUp";
  }

  const logInRedirect = () =>{
    window.location.href="/logIn";
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <span className="logo logoFlex">
          <a href="/"><img className="logoIcon" src="/images/logos/LogoPapaNoel.png" alt="Logo" /></a>
          <a className="aWhite" href="/">Viajojo.com</a>
        </span>
        <div className="navItems">
          <button className="navButton" onClick={signUpRedirect} href="/signUp">Sign up</button>
          <button className="navButton" onClick={logInRedirect}>Log in</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar