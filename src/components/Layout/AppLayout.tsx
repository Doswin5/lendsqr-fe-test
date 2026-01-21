import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.scss";

type SideItemProps = {
  to: string;
  icon: string;
  label: string;
  exact?: boolean;
};

const SideItem = ({ to, icon, label }: SideItemProps) => {
  const isRealRoute = to.startsWith("/");

  if (!isRealRoute) {
    return (
      <a className="app__navItem" href="#" onClick={(e) => e.preventDefault()}>
        <img src={icon} alt="" />
        <span>{label}</span>
      </a>
    );
  }

  return (
    <NavLink
      className={({ isActive }) =>
        `app__navItem ${isActive ? "is-active" : ""}`
      }
      to={to}
    >
      <img src={icon} alt="" />
      <span>{label}</span>
    </NavLink>
  );
};

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
            <SideItem
              to="/dashboard"
              icon="/dashboard-icon.svg"
              label="Dashboard"
            />

            <p className="app__navSection">CUSTOMERS</p>

            <SideItem to="/users" icon="/users-icon.svg" label="Users" />
            <SideItem to="__" icon="/guarantor-icon.svg" label="Guarantors" />
            <SideItem to="__" icon="/loan-icon.svg" label="Loans" />
            <SideItem
              to="__"
              icon="/decision-icon.svg"
              label="Decision Models"
            />
            <SideItem to="__" icon="/saving-icon.svg" label="Savings" />
            <SideItem
              to="__"
              icon="/loanrequest-icon.svg"
              label="Loan Requests"
            />
            <SideItem to="__" icon="/whitelist-icon.svg" label="Whitelist" />
            <SideItem to="__" icon="/karma-icon.svg" label="Karma" />

            <p className="app__navSection">BUSINESSES</p>

            <SideItem
              to="__"
              icon="/organization-icon.svg"
              label="Organization"
            />
            <SideItem
              to="__"
              icon="/loanproducts-icon.svg"
              label="Loan Products"
            />
            <SideItem
              to="__"
              icon="/savingsproducts-icon.svg"
              label="Savings Products"
            />
            <SideItem to="__" icon="/fees-icon.svg" label="Fees and Charges" />
            <SideItem
              to="__"
              icon="/transactions-icon.svg"
              label="Transactions"
            />
            <SideItem to="__" icon="/services-icon.svg" label="Services" />
            <SideItem
              to="__"
              icon="/serviceaccount-icon.svg"
              label="Service Account"
            />
            <SideItem
              to="__"
              icon="/settlements-icon.svg"
              label="Settlements"
            />
            <SideItem to="__" icon="/reports-icon.svg" label="Reports" />

            <p className="app__navSection">SETTINGS</p>

            <SideItem
              to="__"
              icon="/preferences-icon.svg"
              label="Preferences"
            />
            <SideItem
              to="__"
              icon="/feespricing-icon.svg"
              label="Fees and Pricing"
            />
            <SideItem to="__" icon="/auditlogs-icon.svg" label="Audit Logs" />
            <SideItem
              to="__"
              icon="/systemmessages-icon.svg"
              label="System Messages"
            />

            <div className="app__navDivider" />

            <SideItem to="__" icon="/logout-icon.svg" label="Logout" />

            <p className="app__version">v1.2.0</p>
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
