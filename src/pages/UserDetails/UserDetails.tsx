import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./UserDetails.scss";

type TabKey =
  | "general"
  | "documents"
  | "bank"
  | "loans"
  | "savings"
  | "app";

const tabs: { key: TabKey; label: string }[] = [
  { key: "general", label: "General Details" },
  { key: "documents", label: "Documents" },
  { key: "bank", label: "Bank Details" },
  { key: "loans", label: "Loans" },
  { key: "savings", label: "Savings" },
  { key: "app", label: "App and System" },
];

const UserDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabKey>("general");

  // Static mock. Replace later with API data.
  const user = useMemo(
    () => ({
      id: id ?? "LSQFf587g90",
      fullName: "Grace Effiom",
      avatar: "/user-avatar.svg", // optional; use your own asset or leave empty
      tier: 1, // 0-3
      balance: "₦200,000.00",
      bank: "Providus Bank",
      accountNo: "9912345678",
      personal: {
        fullName: "Grace Effiom",
        phone: "07060780922",
        email: "grace@gmail.com",
        bvn: "07060780922",
        gender: "Female",
        maritalStatus: "Single",
        children: "None",
        residence: "Parent’s Apartment",
      },
      education: {
        level: "B.Sc",
        employment: "Employed",
        sector: "FinTech",
        duration: "2 years",
        officeEmail: "grace@lendstar.com",
        monthlyIncome: "₦200,000.00 - ₦400,000.00",
        loanRepayment: "40,000",
      },
      socials: {
        twitter: "@grace_effiom",
        facebook: "Grace Effiom",
        instagram: "@grace.effiom",
      },
      guarantor: {
        fullName: "Debby Ogana",
        phone: "08160780928",
        email: "debby2@irorun.com",
        relationship: "Sister",
      },
    }),
    [id]
  );

  const renderStars = (tier: number) => {
    const stars = [0, 1, 2].map((i) => (
      <img key={i} src={i < tier ? "/star-icon.svg" : "/star2-icon.svg"} alt="" />
       
    ));
    return <div className="ud__stars">{stars}</div>;
  };

  return (
    <div className="ud">
      <Link to="/users" className="ud__back">
        ← Back to Users
      </Link>

      <div className="ud__header">
        <h1 className="ud__title">User Details</h1>

        <div className="ud__headerActions">
          <button className="ud__btn ud__btn--danger" type="button">
            BLACKLIST USER
          </button>
          <button className="ud__btn ud__btn--primary" type="button">
            ACTIVATE USER
          </button>
        </div>
      </div>

      <div className="ud__card">
        <div className="ud__summary">
          <div className="ud__avatar">
            {/* If you don’t have an avatar asset, keep the circle + icon */}
            <img src="/avatar-icon.svg" alt="" />
          </div>

          <div className="ud__summaryMain">
            <p className="ud__name">{user.fullName}</p>
            <p className="ud__userId">{user.id}</p>
          </div>

          <div className="ud__divider" />

          <div className="ud__summaryTier">
            <p className="ud__label">User’s Tier</p>
            {renderStars(user.tier)}
          </div>

          <div className="ud__divider" />

          <div className="ud__summaryMoney">
            <p className="ud__balance">{user.balance}</p>
            <p className="ud__account">
              {user.accountNo}/{user.bank}
            </p>
          </div>
        </div>

        <div className="ud__tabs">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              className={
                activeTab === t.key ? "ud__tab is-active" : "ud__tab"
              }
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "general" ? (
        <div className="ud__details">
          <section className="ud__section">
            <h2 className="ud__sectionTitle">Personal Information</h2>

            <div className="ud__grid">
              <div className="ud__item">
                <p className="ud__itemLabel">FULL NAME</p>
                <p className="ud__itemValue">{user.personal.fullName}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">PHONE NUMBER</p>
                <p className="ud__itemValue">{user.personal.phone}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">EMAIL ADDRESS</p>
                <p className="ud__itemValue">{user.personal.email}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">BVN</p>
                <p className="ud__itemValue">{user.personal.bvn}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">GENDER</p>
                <p className="ud__itemValue">{user.personal.gender}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">MARITAL STATUS</p>
                <p className="ud__itemValue">{user.personal.maritalStatus}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">CHILDREN</p>
                <p className="ud__itemValue">{user.personal.children}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">TYPE OF RESIDENCE</p>
                <p className="ud__itemValue">{user.personal.residence}</p>
              </div>
            </div>
          </section>

          <section className="ud__section">
            <h2 className="ud__sectionTitle">Education and Employment</h2>

            <div className="ud__grid ud__grid--4">
              <div className="ud__item">
                <p className="ud__itemLabel">LEVEL OF EDUCATION</p>
                <p className="ud__itemValue">{user.education.level}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">EMPLOYMENT STATUS</p>
                <p className="ud__itemValue">{user.education.employment}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">SECTOR OF EMPLOYMENT</p>
                <p className="ud__itemValue">{user.education.sector}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">DURATION OF EMPLOYMENT</p>
                <p className="ud__itemValue">{user.education.duration}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">OFFICE EMAIL</p>
                <p className="ud__itemValue">{user.education.officeEmail}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">MONTHLY INCOME</p>
                <p className="ud__itemValue">{user.education.monthlyIncome}</p>
              </div>

              <div className="ud__item">
                <p className="ud__itemLabel">LOAN REPAYMENT</p>
                <p className="ud__itemValue">{user.education.loanRepayment}</p>
              </div>
            </div>
          </section>

          <section className="ud__section">
            <h2 className="ud__sectionTitle">Socials</h2>

            <div className="ud__grid">
              <div className="ud__item">
                <p className="ud__itemLabel">TWITTER</p>
                <p className="ud__itemValue">{user.socials.twitter}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">FACEBOOK</p>
                <p className="ud__itemValue">{user.socials.facebook}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">INSTAGRAM</p>
                <p className="ud__itemValue">{user.socials.instagram}</p>
              </div>
            </div>
          </section>

          <section className="ud__section">
            <h2 className="ud__sectionTitle">Guarantor</h2>

            <div className="ud__grid">
              <div className="ud__item">
                <p className="ud__itemLabel">FULL NAME</p>
                <p className="ud__itemValue">{user.guarantor.fullName}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">PHONE NUMBER</p>
                <p className="ud__itemValue">{user.guarantor.phone}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">EMAIL ADDRESS</p>
                <p className="ud__itemValue">{user.guarantor.email}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">RELATIONSHIP</p>
                <p className="ud__itemValue">{user.guarantor.relationship}</p>
              </div>
            </div>
          </section>
          <section className="ud__section">
            <h2 className="ud__sectionTitle"></h2>

            <div className="ud__grid">
              <div className="ud__item">
                <p className="ud__itemLabel">FULL NAME</p>
                <p className="ud__itemValue">{user.guarantor.fullName}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">PHONE NUMBER</p>
                <p className="ud__itemValue">{user.guarantor.phone}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">EMAIL ADDRESS</p>
                <p className="ud__itemValue">{user.guarantor.email}</p>
              </div>
              <div className="ud__item">
                <p className="ud__itemLabel">RELATIONSHIP</p>
                <p className="ud__itemValue">{user.guarantor.relationship}</p>
              </div>
            </div>
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
