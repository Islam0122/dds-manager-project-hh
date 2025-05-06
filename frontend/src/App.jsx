import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage.jsx';
import CreateEditPage from './pages/CreateEditPage.jsx';
import DictionaryPage from './pages/DictionaryPage.jsx';

function App() {
  return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/*<Route path="/create-edit" element={<CreateEditPage />} />*/}
            {/*<Route path="/dictionary" element={<DictionaryPage />} />*/}
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App;
