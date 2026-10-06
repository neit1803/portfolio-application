-- V1: one published portfolio. Insert profiles.owner_id with your auth.users UUID.
create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id),
  full_name text not null,
  title text not null,
  summary text not null default '',
  avatar_url text,
  email text,
  location text,
  is_published boolean not null default false,
  updated_at timestamptz not null default now()
);
create unique index one_published_profile on public.profiles (is_published) where is_published;
create index profiles_owner_id_idx on public.profiles (owner_id);

create table public.educations (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  school text not null,
  degree text,
  major text,
  start_date date,
  end_date date,
  description text,
  sort_order integer not null default 0,
  check (end_date is null or start_date is null or end_date >= start_date)
);
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  company text not null,
  role text not null,
  start_date date,
  end_date date,
  description text,
  technologies text[] not null default '{}',
  sort_order integer not null default 0,
  check (end_date is null or start_date is null or end_date >= start_date)
);
create table public.experience_responsibilities (
  id uuid primary key default gen_random_uuid(),
  experience_id uuid not null references public.experiences(id) on delete cascade,
  content text not null,
  sort_order integer not null default 0
);
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  description text not null default '',
  technologies text[] not null default '{}',
  github_url text,
  demo_url text,
  sort_order integer not null default 0,
  check (github_url is null or github_url ~ '^https://'),
  check (demo_url is null or demo_url ~ '^https://')
);
create table public.project_images (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  storage_path text not null,
  alt_text text,
  sort_order integer not null default 0
);
create table public.skills (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  category text not null,
  icon_url text,
  level integer check (level between 1 and 5),
  keyboard_key text,
  sort_order integer not null default 0
);
create table public.social_links (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  platform text not null,
  url text not null check (url ~ '^https://'),
  icon_url text,
  sort_order integer not null default 0
);
create table public.resumes (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles(id) on delete cascade,
  storage_path text,
  updated_at timestamptz not null default now()
);

create index educations_profile_order_idx on public.educations (profile_id, sort_order);
create index experiences_profile_order_idx on public.experiences (profile_id, sort_order);
create index responsibilities_experience_order_idx on public.experience_responsibilities (experience_id, sort_order);
create index projects_profile_order_idx on public.projects (profile_id, sort_order);
create index images_project_order_idx on public.project_images (project_id, sort_order);
create index skills_profile_order_idx on public.skills (profile_id, sort_order);
create index links_profile_order_idx on public.social_links (profile_id, sort_order);

-- Owner checks use the private auth.users UUID, never a public key.
create function public.owns_portfolio(p_profile_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = p_profile_id and p.owner_id = (select auth.uid()));
$$;
create function public.portfolio_is_published(p_profile_id uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.profiles p where p.id = p_profile_id and p.is_published);
$$;
revoke all on function public.owns_portfolio(uuid) from public;
revoke all on function public.portfolio_is_published(uuid) from public;
grant execute on function public.owns_portfolio(uuid) to anon, authenticated;
grant execute on function public.portfolio_is_published(uuid) to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.educations enable row level security;
alter table public.experiences enable row level security;
alter table public.experience_responsibilities enable row level security;
alter table public.projects enable row level security;
alter table public.project_images enable row level security;
alter table public.skills enable row level security;
alter table public.social_links enable row level security;
alter table public.resumes enable row level security;

create policy profiles_read on public.profiles for select using (is_published or owner_id = (select auth.uid()));
create policy profiles_insert on public.profiles for insert to authenticated with check (owner_id = (select auth.uid()));
create policy profiles_update on public.profiles for update to authenticated using (owner_id = (select auth.uid())) with check (owner_id = (select auth.uid()));
create policy profiles_delete on public.profiles for delete to authenticated using (owner_id = (select auth.uid()));

create policy educations_read on public.educations for select using (public.portfolio_is_published(profile_id) or public.owns_portfolio(profile_id));
create policy educations_write on public.educations for all to authenticated using (public.owns_portfolio(profile_id)) with check (public.owns_portfolio(profile_id));
create policy experiences_read on public.experiences for select using (public.portfolio_is_published(profile_id) or public.owns_portfolio(profile_id));
create policy experiences_write on public.experiences for all to authenticated using (public.owns_portfolio(profile_id)) with check (public.owns_portfolio(profile_id));
create policy projects_read on public.projects for select using (public.portfolio_is_published(profile_id) or public.owns_portfolio(profile_id));
create policy projects_write on public.projects for all to authenticated using (public.owns_portfolio(profile_id)) with check (public.owns_portfolio(profile_id));
create policy skills_read on public.skills for select using (public.portfolio_is_published(profile_id) or public.owns_portfolio(profile_id));
create policy skills_write on public.skills for all to authenticated using (public.owns_portfolio(profile_id)) with check (public.owns_portfolio(profile_id));
create policy social_links_read on public.social_links for select using (public.portfolio_is_published(profile_id) or public.owns_portfolio(profile_id));
create policy social_links_write on public.social_links for all to authenticated using (public.owns_portfolio(profile_id)) with check (public.owns_portfolio(profile_id));
create policy resumes_read on public.resumes for select using (public.portfolio_is_published(profile_id) or public.owns_portfolio(profile_id));
create policy resumes_write on public.resumes for all to authenticated using (public.owns_portfolio(profile_id)) with check (public.owns_portfolio(profile_id));
create policy responsibilities_read on public.experience_responsibilities for select using (
  exists (select 1 from public.experiences e where e.id = experience_id and (public.portfolio_is_published(e.profile_id) or public.owns_portfolio(e.profile_id)))
);
create policy responsibilities_write on public.experience_responsibilities for all to authenticated using (
  exists (select 1 from public.experiences e where e.id = experience_id and public.owns_portfolio(e.profile_id))
) with check (
  exists (select 1 from public.experiences e where e.id = experience_id and public.owns_portfolio(e.profile_id))
);
create policy images_read on public.project_images for select using (
  exists (select 1 from public.projects p where p.id = project_id and (public.portfolio_is_published(p.profile_id) or public.owns_portfolio(p.profile_id)))
);
create policy images_write on public.project_images for all to authenticated using (
  exists (select 1 from public.projects p where p.id = project_id and public.owns_portfolio(p.profile_id))
) with check (
  exists (select 1 from public.projects p where p.id = project_id and public.owns_portfolio(p.profile_id))
);

-- Public assets: only uploaded paths are used by the published portfolio.
insert into storage.buckets (id, name, public) values ('project-images', 'project-images', true), ('resumes', 'resumes', true)
on conflict (id) do nothing;
create policy portfolio_assets_read on storage.objects for select to anon, authenticated
using (bucket_id in ('project-images', 'resumes'));
create policy portfolio_assets_insert on storage.objects for insert to authenticated
with check (bucket_id in ('project-images', 'resumes') and exists (select 1 from public.profiles p where p.owner_id = (select auth.uid())));
create policy portfolio_assets_update on storage.objects for update to authenticated
using (bucket_id in ('project-images', 'resumes') and exists (select 1 from public.profiles p where p.owner_id = (select auth.uid())))
with check (bucket_id in ('project-images', 'resumes') and exists (select 1 from public.profiles p where p.owner_id = (select auth.uid())));
create policy portfolio_assets_delete on storage.objects for delete to authenticated
using (bucket_id in ('project-images', 'resumes') and exists (select 1 from public.profiles p where p.owner_id = (select auth.uid())));
