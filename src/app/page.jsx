import LoginForm from "./components/loginForm";
import ParticlesComponent from "./components/particles";
import style from "../app/styles/login.module.css";
export default function Home() {
  return (
    <main>
      <ParticlesComponent class={style.particles} />
      <LoginForm />
    </main>
  );
}
