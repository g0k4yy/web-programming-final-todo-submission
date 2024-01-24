import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComponent from './components/NavbarComponent';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import TodoList from './components/Todo/TodoList';
import AddTodo from './components/Todo/AddTodo';
import { AuthProvider } from './contexts/AuthContext';
import ContactPage from './components/ContactPage';
import MapPage from './components/MapPage';

function App(){;

  return (
    <AuthProvider>
    <Router>
      <NavbarComponent />
      <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register/>} />
  <Route path="/todo" element={<TodoList />} />
  <Route path="/add-todo" element={<AddTodo />} />
  <Route path="/contact" element={<ContactPage/>} />
  <Route path="/map" element={<MapPage/>} />
  <Route path="/" element={<Register/>} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
