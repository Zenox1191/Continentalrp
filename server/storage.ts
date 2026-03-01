import { db } from "./db";
import { rules, staff, type InsertRule, type InsertStaff, type RuleResponse, type StaffResponse } from "@shared/schema";

export interface IStorage {
  getRules(): Promise<RuleResponse[]>;
  getStaff(): Promise<StaffResponse[]>;
  createRule(rule: InsertRule): Promise<RuleResponse>;
  createStaff(staffMember: InsertStaff): Promise<StaffResponse>;
}

export class DatabaseStorage implements IStorage {
  async getRules(): Promise<RuleResponse[]> {
    return await db.select().from(rules).orderBy(rules.order);
  }

  async getStaff(): Promise<StaffResponse[]> {
    return await db.select().from(staff).orderBy(staff.order);
  }

  async createRule(rule: InsertRule): Promise<RuleResponse> {
    const [created] = await db.insert(rules).values(rule).returning();
    return created;
  }

  async createStaff(staffMember: InsertStaff): Promise<StaffResponse> {
    const [created] = await db.insert(staff).values(staffMember).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
