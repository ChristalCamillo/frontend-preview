import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { Eye, EyeOff } from "lucide-react";

/**
 * Componente de Cadastro (Register) - FitMeet
 * Design Pixel-Perfect com correção de scroll e centralização segura.
 */
export function Register() {
  const navigate = useNavigate();

  // Estados para os campos obrigatórios (UserRequest.java)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const payload = { name, email, cpf, password };

      await api.post("/auth/register", payload);

      // Sucesso: Redireciona para o login
      navigate("/login");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErrorMessage(
        "Erro ao criar conta. Verifique os dados e tente novamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* h-screen e overflow-hidden: Garante que a estrutura da página não "fuja" */
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans">
      {/* Lado Esquerdo: Imagem Fixa (Margem de 12px e Borda de 12px) */}
      <div className="hidden h-full w-1/2 max-w-[708px] p-[12px] lg:block">
        <img
          src="/image_d21637.jpg"
          alt="FitMeet Destaque"
          className="h-full w-full rounded-[12px] object-cover shadow-sm"
        />
      </div>

      {/* Lado Direito: Formulário com Safe-Scrolling */}
      <div className="flex w-full flex-col overflow-y-auto bg-white p-8 lg:w-1/2">
        {/* mx-auto e my-auto: Centraliza o formulário se houver espaço. 
          Se o formulário for maior que a tela, ele gruda no topo (0) permitindo o scroll completo.
        */}
        <div className="mx-auto my-auto flex w-full max-w-[320px] flex-col gap-12 py-10">
          {/* Logo Oficial FitMeet */}
          <div className="flex h-[40px] items-center">
            <img
              src="/Logo.png"
              alt="Logo FitMeet"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Form Area: Gap de 32px conforme especificação */}
          <div className="flex flex-col gap-8">
            {/* Header: Título em Bebas Neue */}
            <div className="flex flex-col gap-3">
              <h2 className="font-bebas text-[32px] leading-[36px] text-text-title">
                Crie sua conta
              </h2>
              <p className="font-sans text-[16px] leading-[24px] text-text-base">
                Preencha os dados abaixo para começar.
              </p>
            </div>

            {/* Formulário: Gap de 24px entre Header e Inputs */}
            <form onSubmit={handleRegister} className="flex flex-col gap-6">
              {errorMessage && (
                <div className="rounded-md border border-danger/20 bg-danger/5 p-4">
                  <p className="font-sans text-sm font-medium text-danger">
                    {errorMessage}
                  </p>
                </div>
              )}

              {/* Lista de Inputs: Gap de 16px entre cada campo */}
              <div className="flex flex-col gap-4">
                {/* Nome */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="font-sans text-[16px] font-semibold text-text-base"
                  >
                    Nome <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isLoading}
                    placeholder="Ex.: João da Silva"
                    className="h-[56px] w-full rounded-lg border border-border-default bg-white px-5 font-sans text-base outline-none transition-colors focus:border-border-focus disabled:bg-bg-disabled"
                  />
                </div>

                {/* E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-sans text-[16px] font-semibold text-text-base"
                  >
                    E-mail <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    placeholder="Ex.: nome@email.com"
                    className="h-[56px] w-full rounded-lg border border-border-default bg-white px-5 font-sans text-base outline-none transition-colors focus:border-border-focus disabled:bg-bg-disabled"
                  />
                </div>

                {/* CPF */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="cpf"
                    className="font-sans text-[16px] font-semibold text-text-base"
                  >
                    CPF <span className="text-danger">*</span>
                  </label>
                  <input
                    id="cpf"
                    type="text"
                    required
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    disabled={isLoading}
                    placeholder="000.000.000-00"
                    className="h-[56px] w-full rounded-lg border border-border-default bg-white px-5 font-sans text-base outline-none transition-colors focus:border-border-focus disabled:bg-bg-disabled"
                  />
                </div>

                {/* Campo Senha com o Olho */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="font-sans text-[16px] font-semibold text-text-base"
                  >
                    Senha <span className="text-danger">*</span>
                  </label>

                  {/* Container relative para o ícone flutuar dentro dele */}
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      placeholder="Sua senha secreta"
                      className="h-[56px] w-full rounded-lg border border-border-default bg-white py-3 pl-5 pr-12 font-sans text-base outline-none transition-colors focus:border-border-focus disabled:bg-bg-disabled"
                    />

                    {/* Botão do Olho posicionado de forma absoluta à direita */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-brand-primary focus:outline-none disabled:cursor-not-allowed"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botão Primário: Altura 48px, Rounded 4px */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex h-[48px] w-full items-center justify-center rounded bg-brand-primary font-sans text-[16px] font-bold text-white transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Cadastrando..." : "Cadastrar"}
              </button>
            </form>

            {/* Link para voltar ao login */}
            <p className="text-center font-sans text-[14px] leading-[20px] text-text-base">
              Já tem conta?{" "}
              <Link
                to="/login"
                className="font-bold text-brand-primary transition-colors hover:text-brand-dark hover:underline"
              >
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
