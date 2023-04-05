import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header>
        <Link href="/">
          <h1>
            <span>Just Add</span>
            <span>Marmite</span>
          </h1>
          <h2>Spread The Joy</h2>
        </Link>
      </header>

      <div className="page-content">{children}</div>

      <footer>
        <p>Copyright &copy; 2023 Just Add Marmite :)</p>
      </footer>
    </div>
  );
};

export default Layout;
