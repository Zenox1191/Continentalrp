import { z } from 'zod';
import { insertRuleSchema, insertStaffSchema, rules, staff } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  rules: {
    list: {
      method: 'GET' as const,
      path: '/api/rules' as const,
      responses: {
        200: z.array(z.custom<typeof rules.$inferSelect>()),
      },
    },
  },
  staff: {
    list: {
      method: 'GET' as const,
      path: '/api/staff' as const,
      responses: {
        200: z.array(z.custom<typeof staff.$inferSelect>()),
      },
    },
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type RulesListResponse = z.infer<typeof api.rules.list.responses[200]>;
export type StaffListResponse = z.infer<typeof api.staff.list.responses[200]>;
