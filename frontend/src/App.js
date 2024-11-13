import logo from './logo.svg';
import './App.css';
import CustomButton from './Button';

function App() {
  const handleButtonClick = async () => {
    try {
      const response = await fetch('/run-init-script-sql', {
        method: 'POST',
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <CustomButton onClick={handleButtonClick}>Initiate DB</CustomButton>
      </header>
    </div>
  );
}

export default App;
