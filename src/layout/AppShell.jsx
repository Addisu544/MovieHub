import HeaderBar from "./HeaderBar";
import "./AppShell.css";

const AppShell = ({ header, children }) => {
  return (
    <div className="app-shell">
      <HeaderBar {...header} />
      <main className="app-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default AppShell;

