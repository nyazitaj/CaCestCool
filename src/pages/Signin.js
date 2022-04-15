import logo from '../logo.svg';
import '../App.css';

function App() {
  return (
    <div className="App container">
      <div className="title-row">
        <h1>CaCestCool</h1>
      </div>
      <form id="signin-row">
        <div className="title-row">
          <h2>Connexion</h2>
        </div>

        <div className="input-row">
          <input type="text" placeholder="Email" />
        </div>

        <div className="input-row">
          <input type="password" placeholder="Mot de passe" />
        </div>

        <div className="button-row">
          <button>Se connecter</button>
        </div>

        <div className="link-row">
          <a href="/forgot-password" title="Mot de passe perdu ?">Mot de passe perdu ?</a>
        </div>

        <div className="link-row">
          <a href="/signup" title="S'enregistrer">S'enregistrer</a>
        </div>
      </form>
    </div>
  );
}

export default App;
