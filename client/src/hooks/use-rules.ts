import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useRules() {
  return useQuery({
    queryKey: [api.rules.list.path],
    queryFn: async () => {
      const res = await fetch(api.rules.list.path, {
        method: api.rules.list.method,
      });
      if (!res.ok) {
        throw new Error("Failed to fetch rules");
      }
      const data = await res.json();
      return api.rules.list.responses[200].parse(data);
    },
  });
}
