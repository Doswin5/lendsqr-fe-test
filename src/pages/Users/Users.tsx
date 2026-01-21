import { useMemo, useState, useRef, useEffect } from "react";
import UsersFilter from "../../components/UsersFilter/UsersFilter";
import Pagination from "../../components/Pagination/Pagination.tsx";
import "./Users.scss";
import UsersActions from "../../components/UsersActions/UsersActions.tsx";

const mockTotal = 100; // for now, match Figma

const Users = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [showFilter, setShowFilter] = useState(false);
  const [openAction, setOpenAction] = useState<string | null>(null);

  // later you'll slice actual data:
  const total = useMemo(() => mockTotal, []);

  const filterRef = useRef<HTMLDivElement | null>(null);
  const actionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(e.target as Node)) {
        setOpenAction(null);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  return (
    <div className="users">
      <h1 className="users__title">Users</h1>

      <div className="users__stats">
        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">USERS</p>
          <p className="users__statValue">2,453</p>
        </div>

        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers2-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">ACTIVE USERS</p>
          <p className="users__statValue">2,453</p>
        </div>

        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers3-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">USERS WITH LOANS</p>
          <p className="users__statValue">12,453</p>
        </div>

        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers4-icon.svg" alt="" />
          </div>
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
                    onMouseDown={(e) => {
                      e.stopPropagation();
                    }}
                    onClick={() => setShowFilter((v) => !v)}
                  >
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>

                {showFilter && (
                  <div ref={filterRef}>
                    <UsersFilter onClose={() => setShowFilter(false)} />
                  </div>
                )}
              </th>

              <th className="users__th">
                <div className="users__thInner">
                  USERNAME
                  <button className="users__filterBtn" type="button">
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  EMAIL
                  <button className="users__filterBtn" type="button">
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  PHONE NUMBER
                  <button className="users__filterBtn" type="button">
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  DATE JOINED
                  <button className="users__filterBtn" type="button">
                    <img src="/filter-icon.svg" alt="" />
                  </button>
                </div>
              </th>
              <th className="users__th">
                <div className="users__thInner">
                  STATUS
                  <button className="users__filterBtn" type="button">
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
              <td className="users__actions">
                <div ref={actionRef} className="users__actionsWrap">
                  <button
                    className="users__actionsBtn"
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() =>
                      setOpenAction(openAction === "1" ? null : "1")
                    }
                  >
                    ⋮
                  </button>

                  {openAction === "1" && (
                    <UsersActions
                      userId="1"
                      onClose={() => setOpenAction(null)}
                    />
                  )}
                </div>
              </td>
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
              <td className="users__actions">
                <div ref={actionRef} className="users__actionsWrap">
                  <button
                    className="users__actionsBtn"
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() =>
                      setOpenAction(openAction === "2" ? null : "2")
                    }
                  >
                    ⋮
                  </button>

                  {openAction === "2" && (
                    <UsersActions
                      userId="2"
                      onClose={() => setOpenAction(null)}
                    />
                  )}
                </div>
              </td>
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
              <td className="users__actions">
                <div ref={actionRef} className="users__actionsWrap">
                  <button
                    className="users__actionsBtn"
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() =>
                      setOpenAction(openAction === "3" ? null : "3")
                    }
                  >
                    ⋮
                  </button>

                  {openAction === "3" && (
                    <UsersActions
                      userId="3"
                      onClose={() => setOpenAction(null)}
                    />
                  )}
                </div>
              </td>
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
              <td className="users__actions">
                <div ref={actionRef} className="users__actionsWrap">
                  <button
                    className="users__actionsBtn"
                    type="button"
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() =>
                      setOpenAction(openAction === "4" ? null : "4")
                    }
                  >
                    ⋮
                  </button>

                  {openAction === "4" && (
                    <UsersActions
                      userId="4"
                      onClose={() => setOpenAction(null)}
                    />
                  )}
                </div>
              </td>
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
