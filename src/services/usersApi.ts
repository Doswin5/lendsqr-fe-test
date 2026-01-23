import { http } from "./http";
import type { User } from "../types/user";

export const usersApi = {
  async list(): Promise<User[]> {
    const { data } = await http.get<User[]>("/users.json");
    return data;
  },

  async getById(id: string): Promise<User | undefined> {
    const users = await this.list();
    return users.find((u) => String(u.id) === String(id));
  },
};
