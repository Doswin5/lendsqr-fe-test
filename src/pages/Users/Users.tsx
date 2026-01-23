import { useEffect, useRef, useState } from "react";
import type { User, UserStatus } from "../../types/user";
import { api } from "../../lib/api";
import UsersFilter from "../../components/UsersFilter/UsersFilter";
import Pagination from "../../components/Pagination/Pagination.tsx";
import "./Users.scss";
import UsersActions from "../../components/UsersActions/UsersActions.tsx";
import { useUsers } from "../../hooks/useUsers";
import { useUserStats } from "../../hooks/useUserStats";

const Users = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showFilter, setShowFilter] = useState(false);
  const [openAction, setOpenAction] = useState<string | null>(null);
  const { users: pageUsers, total, loading, error } = useUsers(page, pageSize);
  const {
    total: totalUsers,
    active: activeUsers,
    loans: loansUsers,
    savings: savingsUsers,
    refresh: refreshStats,
  } = useUserStats();
  const [rows, setRows] = useState<User[]>([]);

  

  useEffect(() => {
    setRows(Array.isArray(pageUsers) ? pageUsers : []);
  }, [pageUsers]);

  const toStatus = (s: any): UserStatus => {
    const v = String(s ?? "").toLowerCase();
    if (
      v === "active" ||
      v === "inactive" ||
      v === "pending" ||
      v === "blacklisted"
    )
      return v;
    return "inactive";
  };

  const updateUserStatus = async (id: string, status: UserStatus) => {
    setRows((prev) => prev.map((u) => (u.id === id ? { ...u, status } : u)));

    try {
      await api<User>(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });

      refreshStats();
    } catch (e) {
       
      setRows(Array.isArray(pageUsers) ? pageUsers : []);
    }
  };

  const statusLabelMap: Record<UserStatus, string> = {
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    blacklisted: "Blacklisted",
  };

  const filterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };

    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="users" onMouseDown={() => setOpenAction(null)}>
      <h1 className="users__title">Users</h1>

      <div className="users__stats">
        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">USERS</p>
          <p className="users__statValue">{totalUsers}</p>
        </div>

        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers2-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">ACTIVE USERS</p>
          <p className="users__statValue">{activeUsers}</p>
        </div>

        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers3-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">USERS WITH LOANS</p>
          <p className="users__statValue">{loansUsers}</p>
        </div>

        <div className="users__stat">
          <div className="users__statIcon users__statIcon--pink">
            <img src="/dashboardUsers4-icon.svg" alt="" />
          </div>
          <p className="users__statLabel">USERS WITH SAVINGS</p>
          <p className="users__statValue">{savingsUsers}</p>
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
            {loading ? (
              <tr>
                <td colSpan={7}>Loading...</td>
              </tr>
            ) : null}
            {error ? (
              <tr>
                <td colSpan={7}>{error}</td>
              </tr>
            ) : null}
            {(Array.isArray(rows) ? rows : [])?.map((u) => {
              const status = toStatus(u.status);

              return (
                <tr key={u.id}>
                  <td>{u.orgName}</td>
                  <td>{u.userName}</td>
                  <td>{u.email}</td>
                  <td>{u.phoneNumber}</td>
                  <td>{new Date(u.createdAt).toLocaleString()}</td>
                  <td>
                    <span className={`status status--${status}`}>
                      {statusLabelMap[status]}
                    </span>
                  </td>
                  <td className="users__actions">
                    <div className="users__actionsWrap">
                      <button
                        className="users__actionsBtn"
                        type="button"
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setOpenAction(openAction === u.id ? null : u.id);
                        }}
                      >
                        ⋮
                      </button>

                      {openAction === u.id && (
                        <div onMouseDown={(e) => e.stopPropagation()}>
                          <UsersActions
                            userId={u.id}
                            status={status}
                            onActivate={() => updateUserStatus(u.id, "active")}
                            onBlacklist={() =>
                              updateUserStatus(u.id, "blacklisted")
                            }
                            onClose={() => setOpenAction(null)}
                          />
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
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
