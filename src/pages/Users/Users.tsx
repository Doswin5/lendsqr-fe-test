import { useMemo, useState } from "react";
import UsersFilter from "../../components/UsersFilter/UsersFilter";
import Pagination from "../../components/Pagination/Pagination.tsx";
import "./Users.scss";

const mockTotal = 100; // for now, match Figma

const Users = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [showFilter, setShowFilter] = useState(false);

  // later you'll slice actual data:
  const total = useMemo(() => mockTotal, []);

  return (
    <div className="users">
      <h1 className="users__title">Users</h1>

      <div className="users__stats">
        <div className="users__stat">
          <p className="users__statLabel">USERS</p>
          <p className="users__statValue">2,453</p>
        </div>

        <div className="users__stat">
          <p className="users__statLabel">ACTIVE USERS</p>
          <p className="users__statValue">2,453</p>
        </div>

        <div className="users__stat">
          <p className="users__statLabel">USERS WITH LOANS</p>
          <p className="users__statValue">12,453</p>
        </div>

        <div className="users__stat">
          <p className="users__statLabel">USERS WITH SAVINGS</p>
          <p className="users__statValue">102,453</p>
        </div>
      </div>

      <div className="users__tableWrap">
        <table className="users__table">
          <thead>
            <tr>
              <th className="users__th">
                <div className="users__thInner">
                  ORGANIZATION
                  <button
                    className="users__filterBtn"
                    type="button"
                    onClick={() => setShowFilter((v) => !v)}
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>

                {showFilter && (
                  <UsersFilter onClose={() => setShowFilter(false)} />
                )}
              </th>

              <th className="users__th">
                <div className="users__thInner">
                  USERNAME
                  <button
                    className="users__filterBtn"
                    type="button"
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  EMAIL
                  <button
                    className="users__filterBtn"
                    type="button"
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  PHONE NUMBER
                  <button
                    className="users__filterBtn"
                    type="button"
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  DATE JOINED
                  <button
                    className="users__filterBtn"
                    type="button"
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  STATUS
                  <button
                    className="users__filterBtn"
                    type="button"
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lendsqr</td>
              <td>Adedeji</td>
              <td>adedeji@lendsqr.com</td>
              <td>08078903721</td>
              <td>May 15, 2020 10:00 AM</td>
              <td>
                <span className="status status--inactive">Inactive</span>
              </td>
              <td className="users__actions">⋮</td>
            </tr>

            <tr>
              <td>Irorun</td>
              <td>Debby Ogana</td>
              <td>debby2@irorun.com</td>
              <td>08160780928</td>
              <td>Apr 30, 2020 10:00 AM</td>
              <td>
                <span className="status status--pending">Pending</span>
              </td>
              <td className="users__actions">⋮</td>
            </tr>

            <tr>
              <td>Lendstar</td>
              <td>Grace Effiom</td>
              <td>grace@lendstar.com</td>
              <td>07060780922</td>
              <td>Apr 30, 2020 10:00 AM</td>
              <td>
                <span className="status status--blacklisted">Blacklisted</span>
              </td>
              <td className="users__actions">⋮</td>
            </tr>

            <tr>
              <td>Lendsqr</td>
              <td>Tosin Dokunmu</td>
              <td>tosin@lendsqr.com</td>
              <td>07003309226</td>
              <td>Apr 10, 2020 10:00 AM</td>
              <td>
                <span className="status status--active">Active</span>
              </td>
              <td className="users__actions">⋮</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination
        total={total}
        page={page}
        pageSize={pageSize}
        onPageChange={(p) => setPage(p)}
        onPageSizeChange={(s) => {
          setPageSize(s);
          setPage(1);
        }}
      />
    </div>
  );
};

export default Users;
