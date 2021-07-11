import './App.css';
import { Header } from './Common/Header';
import ErrorBoundary from './Components/ErrorBoundary.component';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <header className="App-header">
          <Header />
        </header>
      </ErrorBoundary>
    </div>
  );
}

export default App;
