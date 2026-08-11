import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/logos")({
  component: () => <Outlet />,
});
