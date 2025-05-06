import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">Денежные операции</div>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-blue-200">Главная</Link>
          <Link to="/create-edit" className="hover:text-blue-200">Добавить запись</Link>
          <Link to="/dictionary" className="hover:text-blue-200">Справочники</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
