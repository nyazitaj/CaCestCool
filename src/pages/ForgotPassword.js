import logo from '../logo.svg';
import '../App.css';

function App() {
  return (
    <div className="App container">
      <div className="title-row">
        <img src="./assets/images/CaCestCool.png" alt="CaCestCool"/>
      </div>
      <form id="signin-row">
        <div className="title-row">
          <h2>Récupération de mot de passe</h2>
        </div>

        <div className="input-row">
          <input type="text" placeholder="Email" />
        </div>

        <div className="button-row">
          <button>Envoyer</button>
        </div>

        <div className="link-row">
          <a href="/" title="S'enregistrer">Se connecter</a>
        </div>
      </form>
    </div>
  );
}

export default App;
