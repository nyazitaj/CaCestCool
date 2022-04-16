import logo from '../logo.svg';
import '../App.css';

function Signup() {

  return (
    <div className="App container">
      <div className="title-row">
        <img src="./assets/images/CaCestCool.png" alt="CaCestCool"/>
      </div>
      <form id="signin-row">
        <div className="title-row">
          <h2>Inscription</h2>
        </div>

        <div className="input-row">
          <input type="text" placeholder="Email" />
        </div>

        <div className="input-row">
          <input type="password" placeholder="Mot de passe" />
        </div>

        <div className="input-row">
          <input type="password" placeholder="Confirmer le mot de passe" />
        </div>

        <div className="button-row">
          <button>S'enregistrer</button>
        </div>

        <div className="link-row">
          <a href="/" title="Mot de passe perdu ?">Vous avez déjà un compte ?</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
