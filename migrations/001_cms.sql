CREATE TABLE IF NOT EXISTS cms_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(), slug text NOT NULL UNIQUE,
  title text NOT NULL DEFAULT '', excerpt text NOT NULL DEFAULT '', content text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','trash')),
  categories text[] NOT NULL DEFAULT '{}', tags text[] NOT NULL DEFAULT '{}', author text NOT NULL DEFAULT '',
  published_at timestamptz, updated_at timestamptz NOT NULL DEFAULT now(),
  seo_title text NOT NULL DEFAULT '', meta_description text NOT NULL DEFAULT '', keyword text NOT NULL DEFAULT '',
  canonical text NOT NULL DEFAULT '', featured_image text NOT NULL DEFAULT '', featured_image_alt text NOT NULL DEFAULT '',
  og_title text NOT NULL DEFAULT '', og_description text NOT NULL DEFAULT '', sources text NOT NULL DEFAULT '',
  internal_links text NOT NULL DEFAULT '', quality jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS cms_posts_slug_unique ON cms_posts (slug);
CREATE TABLE IF NOT EXISTS cms_categories (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), name text NOT NULL UNIQUE, slug text NOT NULL UNIQUE);
CREATE TABLE IF NOT EXISTS cms_media (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), url text NOT NULL UNIQUE, filename text NOT NULL, content_type text NOT NULL, size_bytes bigint NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS cms_seo_rules (id text NOT NULL, version integer NOT NULL, name text NOT NULL, config jsonb NOT NULL, source_url text, status text NOT NULL DEFAULT 'approved', created_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY(id,version));
CREATE TABLE IF NOT EXISTS cms_sync_state (key text PRIMARY KEY, value jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS cms_guidance_changes (id text PRIMARY KEY, title text NOT NULL, description text NOT NULL, source_url text NOT NULL, observed_at timestamptz NOT NULL DEFAULT now(), published_at timestamptz, status text NOT NULL DEFAULT 'review', affected_rules text[] NOT NULL DEFAULT '{}');
CREATE TABLE IF NOT EXISTS cms_evaluations (id bigserial PRIMARY KEY, post_id uuid NOT NULL REFERENCES cms_posts(id) ON DELETE CASCADE, score integer NOT NULL, rules_version text NOT NULL, checks jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS cms_login_attempts (id bigserial PRIMARY KEY, ip_hash text NOT NULL, success boolean NOT NULL DEFAULT false, created_at timestamptz NOT NULL DEFAULT now());
CREATE INDEX IF NOT EXISTS cms_login_attempts_ip_time ON cms_login_attempts(ip_hash,created_at DESC);
CREATE TABLE IF NOT EXISTS cms_audit_log (id bigserial PRIMARY KEY, actor text NOT NULL, action text NOT NULL, entity_id text, details jsonb NOT NULL DEFAULT '{}'::jsonb, created_at timestamptz NOT NULL DEFAULT now());

INSERT INTO cms_seo_rules(id,version,name,config,source_url,status) VALUES
('title',1,'Descriptive page title','{"type":"recommendation"}','https://developers.google.com/search/docs/essentials','approved'),
('people-first',1,'People-first content','{"type":"heuristic"}','https://developers.google.com/search/docs/fundamentals/creating-helpful-content','approved'),
('article-schema',1,'Article structured data','{"type":"recommendation"}','https://developers.google.com/search/docs/appearance/structured-data/article','approved')
ON CONFLICT DO NOTHING;
