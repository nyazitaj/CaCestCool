import logo from '../logo.svg';
import '../App.css';

function App() {
  return (
    <div className="App container">
      <div className="title-row">
        <h2>CaCestCool</h2>
      </div>
      <form id="signin-row">
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
