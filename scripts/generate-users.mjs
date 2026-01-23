import { faker } from "@faker-js/faker";
import fs from "node:fs";

const statuses = ["active", "inactive", "pending", "blacklisted"];
const banks = ["Providus Bank", "GTBank", "Access Bank", "Zenith Bank", "UBA"];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const money = (min = 10000, max = 800000) => {
  const n = faker.number.int({ min, max });
  return String(n);
};

const isoDate = () =>
  faker.date
    .between({ from: "2019-01-01T00:00:00.000Z", to: "2020-12-31T23:59:59.000Z" })
    .toISOString();

const buildUser = (i) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const orgName = faker.company.name().split(" ")[0];
  const phone = faker.phone.number("08#########");
  const email = faker.internet.email({ firstName, lastName }).toLowerCase();

  const minIncome = money(50000, 250000);
  const maxIncome = money(260000, 600000);

  const guarantor1 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number("08#########"),
    email: faker.internet.email().toLowerCase(),
    relationship: pick(["Sister", "Brother", "Friend", "Colleague"]),
  };

  const guarantor2 = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phoneNumber: faker.phone.number("08#########"),
    email: faker.internet.email().toLowerCase(),
    relationship: pick(["Sister", "Brother", "Friend", "Colleague"]),
  };

  return {
    id: String(i + 1),
    orgName,
    userName: `${firstName} ${lastName}`,
    email,
    phoneNumber: phone,
    createdAt: isoDate(),
    status: pick(statuses),
    accountNumber: faker.finance.accountNumber(10),
    accountBalance: money(10000, 900000),
    bank: pick(banks),
    profile: {
      firstName,
      lastName,
      phoneNumber: phone,
      avatar: "",
      gender: pick(["Male", "Female"]),
      bvn: faker.finance.accountNumber(11),
      maritalStatus: pick(["Single", "Married"]),
      children: pick(["None", "1", "2", "3"]),
      residence: pick(["Parent's Apartment", "Rented Apartment", "Own House"]),
    },
    education: {
      level: pick(["B.Sc", "HND", "M.Sc"]),
      employmentStatus: pick(["Employed", "Self-employed", "Unemployed"]),
      sector: pick(["FinTech", "Banking", "Retail", "Health", "Education"]),
      duration: `${faker.number.int({ min: 0, max: 10 })} years`,
      officeEmail: faker.internet.email({ firstName, lastName }).toLowerCase(),
      monthlyIncome: [minIncome, maxIncome],
      loanRepayment: money(0, 100000),
    },
    socials: {
      twitter: `@${faker.internet.username({ firstName, lastName }).toLowerCase()}`,
      facebook: `${firstName} ${lastName}`,
      instagram: `@${faker.internet.username({ firstName, lastName }).toLowerCase()}`,
    },
    guarantors: [guarantor1, guarantor2],
  };
};

const users = Array.from({ length: 500 }, (_, i) => buildUser(i));

const db = { users };

fs.mkdirSync("db", { recursive: true });
fs.writeFileSync("db/db.json", JSON.stringify(db, null, 2));
console.log("Generated db/db.json with", users.length, "users");
