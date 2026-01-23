import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserDetails.scss";
import { useUser } from "../../hooks/useUser";

type TabKey = "general" | "documents" | "bank" | "loans" | "savings" | "app";

const tabs: { key: TabKey; label: string }[] = [
  { key: "general", label: "General Details" },
  { key: "documents", label: "Documents" },
  { key: "bank", label: "Bank Details" },
  { key: "loans", label: "Loans" },
  { key: "savings", label: "Savings" },
  { key: "app", label: "App and System" },
];

const formatMoney = (amount?: string) => {
  const n = Number(amount ?? 0);
  return `₦${n.toLocaleString("en-NG", { minimumFractionDigits: 2 })}`;
};

const formatRange = (range?: string[]) => {
  if (!range || range.length < 2) return "—";
  const [min, max] = range;
  return `${formatMoney(min)} - ${formatMoney(max)}`;
};

const UserDetails = () => {
  const [activeTab, setActiveTab] = useState<TabKey>("general");
  const { user, loading, error, blacklist, activate } = useUser();

  if (loading) return <div className="userDetails">Loading...</div>;
  if (error) return <div className="userDetails">{error}</div>;
  if (!user) return <div className="userDetails">User not found</div>;

  const renderStars = (tier: number) => (
    <div className="ud__stars">
      {[0, 1, 2].map((i) => (
        <img
          key={i}
          src={i < tier ? "/star-icon.svg" : "/star2-icon.svg"}
          alt=""
        />
      ))}
    </div>
  );

  const fullName = `${user.profile?.firstName ?? ""} ${
    user.profile?.lastName ?? ""
  }`.trim();

  return (
    <div className="ud">
      <Link to="/users" className="ud__back">
        ← Back to Users
      </Link>

      <div className="ud__header">
        <h1 className="ud__title">User Details</h1>

        <div className="ud__headerActions">
          <button
            className="ud__btn ud__btn--danger"
            type="button"
            onClick={blacklist}
          >
            BLACKLIST USER
          </button>
          <button
            className="ud__btn ud__btn--primary"
            type="button"
            onClick={activate}
          >
            ACTIVATE USER
          </button>
        </div>
      </div>

      <div className="ud__card">
        <div className="ud__summary">
          <div className="ud__avatar">
            {user.profile?.avatar ? (
              <img src={user.profile.avatar} alt="" />
            ) : (
              <img src="/avatar-icon.svg" alt="" />
            )}
          </div>

          <div className="ud__summaryMain">
            <p className="ud__name">{fullName || user.userName}</p>
            <p className="ud__userId">{user.id}</p>
          </div>

          <div className="ud__divider" />

          <div className="ud__summaryTier">
            <p className="ud__label">User’s Tier</p>
            {renderStars(2)}
          </div>

          <div className="ud__divider" />

          <div className="ud__summaryMoney">
            <p className="ud__balance">{formatMoney(user.accountBalance)}</p>
            <p className="ud__account">{user.accountNumber}/{user.bank ?? "Providus Bank"}</p>
          </div>
        </div>

        <div className="ud__tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={activeTab === t.key ? "ud__tab is-active" : "ud__tab"}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "general" ? (
        <div className="ud__details">
          {/* Personal Information */}
          <section className="ud__section">
            <h2 className="ud__sectionTitle">Personal Information</h2>

            <div className="ud__grid">
              <div className="ud__item">
                <p className="ud__itemLabel">FULL NAME</p>
                <p className="ud__itemValue">{fullName || "—"}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">PHONE NUMBER</p>
                <p className="ud__itemValue">
                  {user.profile?.phoneNumber || "—"}
                </p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">EMAIL ADDRESS</p>
                <p className="ud__itemValue">{user.email || "—"}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">BVN</p>
                <p className="ud__itemValue">{user.profile?.bvn || "—"}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">GENDER</p>
                <p className="ud__itemValue">{user.profile?.gender || "—"}</p>
              </div>

              {/* Your JSON doesn’t have these yet. Keep as placeholders or remove */}
              <div className="ud__item">
                <p className="ud__itemLabel">MARITAL STATUS</p>
                <p className="ud__itemValue">
                  {user.profile?.maritalStatus || "—"}
                </p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">CHILDREN</p>
                <p className="ud__itemValue">{user.profile?.children || "—"}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">TYPE OF RESIDENCE</p>
                <p className="ud__itemValue">
                  {user.profile?.residence || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Education and Employment */}
          <section className="ud__section">
            <h2 className="ud__sectionTitle">Education and Employment</h2>

            <div className="ud__grid ud__grid--4">
              <div className="ud__item">
                <p className="ud__itemLabel">LEVEL OF EDUCATION</p>
                <p className="ud__itemValue">{user.education?.level || "—"}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">EMPLOYMENT STATUS</p>
                <p className="ud__itemValue">
                  {user.education?.employmentStatus || "—"}
                </p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">SECTOR OF EMPLOYMENT</p>
                <p className="ud__itemValue">{user.education?.sector || "—"}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">DURATION OF EMPLOYMENT</p>
                <p className="ud__itemValue">
                  {user.education?.duration || "—"}
                </p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">OFFICE EMAIL</p>
                <p className="ud__itemValue">
                  {user.education?.officeEmail || "—"}
                </p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">MONTHLY INCOME</p>
                <p className="ud__itemValue">
                  {formatRange(user.education?.monthlyIncome)}
                </p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">LOAN REPAYMENT</p>
                <p className="ud__itemValue">
                  {formatMoney(user.education?.loanRepayment)}
                </p>
              </div>
            </div>
          </section>

          {/* Socials */}
          <section className="ud__section">
            <h2 className="ud__sectionTitle">Socials</h2>

            <div className="ud__grid">
              <div className="ud__item">
                <p className="ud__itemLabel">TWITTER</p>
                <p className="ud__itemValue">{user.socials?.twitter || "—"}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">FACEBOOK</p>
                <p className="ud__itemValue">{user.socials?.facebook || "—"}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">INSTAGRAM</p>
                <p className="ud__itemValue">
                  {user.socials?.instagram || "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Guarantor */}
          <section className="ud__section">
  <h2 className="ud__sectionTitle">Guarantor</h2>

  {(user.guarantors?.length ? user.guarantors : []).map((g, idx) => {
    const gName = `${g.firstName ?? ""} ${g.lastName ?? ""}`.trim();

    return (
      <div key={idx} className={idx > 0 ? "ud__guarantorBlock" : ""}>
        <div className="ud__grid">
          <div className="ud__item">
            <p className="ud__itemLabel">FULL NAME</p>
            <p className="ud__itemValue">{gName || "—"}</p>
          </div>

          <div className="ud__item">
            <p className="ud__itemLabel">PHONE NUMBER</p>
            <p className="ud__itemValue">{g.phoneNumber || "—"}</p>
          </div>

          <div className="ud__item">
            <p className="ud__itemLabel">EMAIL ADDRESS</p>
            <p className="ud__itemValue">{g.email || "—"}</p>
          </div>

          <div className="ud__item">
            <p className="ud__itemLabel">RELATIONSHIP</p>
            <p className="ud__itemValue">{g.relationship || "—"}</p>
          </div>
        </div>
      </div>
    );
  })}
</section>

        </div>
      ) : (
        <div className="ud__empty">
          <p className="ud__emptyText">
            {tabs.find((t) => t.key === activeTab)?.label} (placeholder)
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
