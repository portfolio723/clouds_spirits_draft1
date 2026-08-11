create table public.client_feedback (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null default 'clouds-and-spirits',
  selected_logo text,
  selected_typography text,
  color_feedback text,
  colors_note text,
  typography_note text,
  logo_note text,
  overall_feedback text,
  created_at timestamptz not null default now()
);

grant insert on public.client_feedback to anon;
grant select, insert on public.client_feedback to authenticated;
grant all on public.client_feedback to service_role;

alter table public.client_feedback enable row level security;

create policy "Anyone can submit review feedback"
on public.client_feedback for insert to anon, authenticated
with check (true);