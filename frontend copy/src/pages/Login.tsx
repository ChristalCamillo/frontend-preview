import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { api } from "../lib/api";

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const payload = { email, password };
      const response = await api.post("/auth/sign-in", payload);

      const token = response.data.token;
      localStorage.setItem("@fitmeet:token", token);

      navigate("/home");
    } catch (error) {
      console.error("Erro na requisição:", error);
      // 404
      setErrorMessage("E-mail ou senha incorretos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* Lado Esquerdo */}
      <div className="hidden h-full w-1/2 max-w-[708px] p-[12px] lg:block">
        <img
          src="/image_d21637.jpg"
          alt="FitMeet Destaque"
          className="h-full w-full rounded-[12px] object-cover"
        />
      </div>

      {/* Lado Direito */}
      <div className="flex w-full flex-col overflow-y-auto p-8 lg:w-1/2">
        <div className="mx-auto my-auto flex w-full max-w-[320px] flex-col gap-12 py-8">
          <div className="flex h-[40px] items-center">
            <img
              src="/Logo.png"
              alt="Logo FitMeet"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="font-bebas text-[32px] leading-[36px] text-text-title">
                Faça login
              </h2>
              <p className="font-sans text-[16px] leading-[24px] text-text-base">
                Bem-vindo(a)! Digite seus dados para iniciar.
              </p>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              {errorMessage && (
                <div className="rounded-md border border-danger/20 bg-danger/5 p-4">
                  <p className="font-sans text-sm font-medium text-danger">
                    {errorMessage}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4">
                {/* Campo E-mail */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="font-sans text-[16px] font-semibold leading-[20px] text-text-base"
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
                    className="h-[56px] w-full rounded-lg border border-border-default bg-white px-5 font-sans text-[16px] outline-none transition-colors focus:border-border-focus disabled:bg-bg-disabled"
                  />
                </div>

                {/* Campo Senha com o Olho */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="password"
                    className="font-sans text-[16px] font-semibold leading-[20px] text-text-base"
                  >
                    Senha <span className="text-danger">*</span>
                  </label>

                  {/* Container relative para o ícone flutuar dentro dele */}
                  <div className="relative">
                    <input
                      id="password"
                      // A mágica acontece aqui: alternar entre text e password
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      placeholder="Sua senha secreta"
                      // Adicionado pr-12 para o texto não ficar embaixo do ícone
                      className="h-[56px] w-full rounded-lg border border-border-default bg-white py-3 pl-5 pr-12 font-sans text-[16px] outline-none transition-colors focus:border-border-focus disabled:bg-bg-disabled"
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

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-[48px] w-full items-center justify-center rounded bg-brand-primary font-sans text-[16px] font-bold text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
              >
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="text-center font-sans text-[14px] leading-[20px] text-text-base">
              Ainda não tem conta?{" "}
              <Link
                to="/register"
                className="font-bold text-brand-primary hover:underline"
              >
                Cadastrar
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
