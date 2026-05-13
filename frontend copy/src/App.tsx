import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

/**
 * Componente principal da aplicação.
 * Define a estrutura de navegação (roteamento).
 */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Se o usuário acessar a raiz '/', ele é mandado para o '/login' */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Rota da nossa tela de Login */}
        <Route path="/login" element={<Login />} />

        {/* TODO: Criar a rota da Home e Cadastro posteriormente */}
        <Route path="/home" element={<div>Página Inicial em construção</div>} />

        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
