import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.scss";

const AppLayout = () => {
  return (
    <div className="app">
      <header className="app__topbar">
        <div className="app__topbarLeft">
          <img className="app__logo" src="/logo.svg" alt="lendsqr" />
        </div>

        <div className="app__search">
          <input
            className="app__searchInput"
            placeholder="Search for anything"
          />
          <button className="app__searchBtn" type="button" aria-label="search">
            <img src="/search-icon.svg" alt="" />
          </button>
        </div>

        <div className="app__topbarRight">
          <a className="app__docs" href="#">
            Docs
          </a>

          <button
            className="app__iconBtn"
            type="button"
            aria-label="notifications"
          >
            <img src="/notification-icon.svg" alt="" />
          </button>

          <div className="app__profile">
            <img className="app__avatar" src="/avatar.png" alt="" />
            <span className="app__name">Adedeji</span>
            <img className="app__caret" src="/dropdown2-icon.svg" alt="" />
          </div>
        </div>
      </header>

      <div className="app__body">
        <aside className="app__sidebar">
          <button className="app__org" type="button">
            <img src="/switch-icon.svg" alt="" />
            <span>Switch Organization</span>
            <img src="/dropdown-icon.svg" alt="" />
          </button>

          <nav className="app__nav">
            <NavLink
              className={({ isActive }) =>
                `app__navItem ${isActive ? "is-active" : ""}`
              }
              to="/dashboard"
            >
              <img src="/dashboard-icon.svg" alt="" />
              <span>Dashboard</span>
            </NavLink>

            <p className="app__navSection">CUSTOMERS</p>

            <NavLink
              className={({ isActive }) =>
                `app__navItem ${isActive ? "is-active" : ""}`
              }
              to="/users"
            >
              <img src="/users-icon.svg" alt="" />
              <span>Users</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/guarantor-icon.svg" alt="" />
              <span>Guarantors</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/loan-icon.svg" alt="" />
              <span>Loans</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/decision-icon.svg" alt="" />
              <span>Decision Models</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/saving-icon.svg" alt="" />
              <span>Savings</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/loanrequest-icon.svg" alt="" />
              <span>Loan Requests</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/whitelist-icon.svg" alt="" />
              <span>Whitelist</span>
            </NavLink>

            <NavLink className="app__navItem" to="#">
              <img src="/karma-icon.svg" alt="" />
              <span>Karma</span>
            </NavLink>
          </nav>
        </aside>

        <main className="app__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
