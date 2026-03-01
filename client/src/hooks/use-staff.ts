import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useStaff() {
  return useQuery({
    queryKey: [api.staff.list.path],
    queryFn: async () => {
      const res = await fetch(api.staff.list.path, {
        method: api.staff.list.method,
      });
      if (!res.ok) {
        throw new Error("Failed to fetch staff");
      }
      const data = await res.json();
      return api.staff.list.responses[200].parse(data);
    },
  });
}
