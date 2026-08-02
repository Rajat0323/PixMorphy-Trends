import type { Post } from "@/data/types";
import { BlogArticleTable } from "@/components/blog-article-table";
import { BlogImage } from "@/components/blog-image";
import { SponsoredAdSlot } from "@/components/blog-post-ui";

type SectionImageChunks = ReturnType<typeof buildSectionImageChunks>;

function buildSectionImageChunks(post: Post) {
  const sectionImageSrcs = new Set(
    post.sections.map((section) => section.image?.src).filter(Boolean),
  );
  const galleryImagesForSections =
    post.galleryImages?.filter((image) => !sectionImageSrcs.has(image.src)) ?? [];
  if (!galleryImagesForSections.length) {
    return post.sections.map(() => [] as NonNullable<Post["galleryImages"]>);
  }

  const sectionsWithoutImage = post.sections.filter((section) => !section.image);
  const sectionCount = Math.max(sectionsWithoutImage.length, 1);
  const chunkSize = Math.ceil(galleryImagesForSections.length / sectionCount);
  let galleryIndex = 0;

  return post.sections.map((section) => {
    if (section.image) {
      return [];
    }
    const chunk = galleryImagesForSections.slice(
      galleryIndex * chunkSize,
      (galleryIndex + 1) * chunkSize,
    );
    galleryIndex += 1;
    return chunk;
  });
}

function SectionImageBlock({
  section,
  index,
  sectionImageChunks,
}: {
  section: Post["sections"][number];
  index: number;
  sectionImageChunks: SectionImageChunks;
}) {
  if (section.image) {
    return (
      <figure className="mt-6 overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-muted)]">
        <div className="relative aspect-[16/10]">
          <BlogImage
            src={section.image.src}
            alt={section.image.alt}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
        <figcaption className="px-4 py-3 text-sm text-[color:var(--text-muted)]">
          {section.image.alt}
        </figcaption>
      </figure>
    );
  }

  if (!sectionImageChunks[index]?.length) {
    return null;
  }

  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2">
      {sectionImageChunks[index].map((image) => (
        <div
          key={image.src}
          className="overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-[color:var(--surface-muted)]"
        >
          <div className="relative aspect-[16/10]">
            <BlogImage
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 100vw, 360px"
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function SectionBody({
  section,
  skipBullets = false,
}: {
  section: Post["sections"][number];
  skipBullets?: boolean;
}) {
  return (
    <>
      <div className="mt-5 space-y-4">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
      {!skipBullets && section.bullets ? (
        <ul className="mt-5 space-y-3">
          {section.bullets.map((bullet) => (
            <li key={bullet} className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3">
              {bullet}
            </li>
          ))}
        </ul>
      ) : null}
      {section.table ? (
        <BlogArticleTable
          caption={section.table.caption}
          headers={section.table.headers}
          rows={section.table.rows}
        />
      ) : null}
    </>
  );
}

export function ExperienceDisclaimer({ note }: { note: string }) {
  return (
    <aside className="rounded-[24px] border border-amber-200 bg-amber-50/80 p-5 text-sm leading-7 text-amber-950">
      <p className="font-semibold">व्यक्तिगत अनुभव — E-E-A-T नोट</p>
      <p className="mt-2">{note}</p>
    </aside>
  );
}

export function BlogPostSections({ post }: { post: Post }) {
  const sectionImageChunks = buildSectionImageChunks(post);
  const tableSectionIndex = post.sections.findIndex((section) => section.table);
  const tableSection = tableSectionIndex >= 0 ? post.sections[tableSectionIndex] : null;
  const narrativeSections = post.sections.filter((_, index) => index !== tableSectionIndex);

  if (post.layoutVariant === "timeline") {
    return (
      <div className="article-prose mx-auto w-full max-w-3xl space-y-8">
        {tableSection ? (
          <section className="rounded-[28px] border-2 border-indigo-200 bg-[linear-gradient(180deg,rgba(99,102,241,0.08),rgba(255,255,255,1))] p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-600">
              Salary Timeline
            </p>
            <h2 className="headline-font mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
              {tableSection.heading}
            </h2>
            <SectionBody section={tableSection} />
          </section>
        ) : null}

        {narrativeSections.map((section, index) => (
          <section
            key={section.heading}
            className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8"
          >
            <h2 className="headline-font text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
              {section.heading}
            </h2>
            <SectionBody section={section} />
            {index === 1 ? (
              <div className="mt-6">
                <SponsoredAdSlot compact />
              </div>
            ) : null}
          </section>
        ))}
      </div>
    );
  }

  if (post.layoutVariant === "journey") {
    return (
      <div className="article-prose mx-auto w-full max-w-3xl space-y-8">
        {post.sections.map((section, index) => (
          <section
            key={section.heading}
            className="relative rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8"
          >
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#0d9488,#2563eb)] text-sm font-bold text-white">
                {index + 1}
              </span>
              <h2 className="headline-font text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
                {section.heading}
              </h2>
            </div>
            <SectionBody section={section} />
            <SectionImageBlock
              section={section}
              index={index}
              sectionImageChunks={sectionImageChunks}
            />
            {index === 1 ? (
              <div className="mt-6">
                <SponsoredAdSlot compact />
              </div>
            ) : null}
          </section>
        ))}
      </div>
    );
  }

  if (post.layoutVariant === "roadmap") {
    return (
      <div className="article-prose mx-auto w-full max-w-3xl space-y-8">
        {post.sections.map((section, index) => {
          const stepMatch = section.heading.match(/^Step\s+(\d+)/i);
          const stepNumber = stepMatch?.[1] ?? String(index + 1);
          const isResourceStep = section.heading.toLowerCase().includes("resource");

          return (
            <section
              key={section.heading}
              className={`relative rounded-[28px] border p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8 ${
                isResourceStep
                  ? "border-emerald-200 bg-[linear-gradient(180deg,rgba(16,185,129,0.08),rgba(255,255,255,1))]"
                  : "border-[color:var(--border)] bg-white"
              }`}
            >
              <div className="mb-4 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#2563eb,#7c3aed)] text-sm font-bold text-white shadow-md">
                  {stepNumber}
                </span>
                <div className="min-w-0 flex-1">
                  {isResourceStep ? (
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600">
                      Free Resources
                    </p>
                  ) : null}
                  <h2 className="headline-font text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
                    {section.heading.replace(/^Step\s+\d+:\s*/i, "")}
                  </h2>
                </div>
              </div>
              <SectionBody section={section} skipBullets={Boolean(section.bullets?.length)} />
              {section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-4 py-3"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
              <SectionImageBlock
                section={section}
                index={index}
                sectionImageChunks={sectionImageChunks}
              />
              {index === 2 ? (
                <div className="mt-6">
                  <SponsoredAdSlot compact />
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    );
  }

  if (post.layoutVariant === "course") {
    return (
      <div className="article-prose mx-auto w-full max-w-3xl space-y-8">
        {post.sections.map((section, index) => (
          <section
            key={section.heading}
            className="rounded-[28px] border border-[color:var(--border)] bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-violet-600">
              Learning Phase {index + 1}
            </p>
            <h2 className="headline-font mt-2 text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
              {section.heading}
            </h2>
            <SectionBody section={section} skipBullets={Boolean(section.bullets?.length)} />
            {section.bullets ? (
              <ul className="mt-5 space-y-3">
                {section.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>
            ) : null}
            <SectionImageBlock
              section={section}
              index={index}
              sectionImageChunks={sectionImageChunks}
            />
            {section.actionItems?.length ? (
              <aside className="mt-6 rounded-[22px] border border-emerald-200 bg-emerald-50/90 p-5">
                <p className="text-sm font-semibold text-emerald-900">आज का Task</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-emerald-950">
                  {section.actionItems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span aria-hidden className="text-emerald-600">
                        →
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
            {index === 2 ? (
              <div className="mt-6">
                <SponsoredAdSlot compact />
              </div>
            ) : null}
          </section>
        ))}
      </div>
    );
  }

  if (post.layoutVariant === "playbook") {
    return (
      <div className="article-prose mx-auto w-full max-w-3xl space-y-8">
        {post.sections.map((section, index) => {
          const isChecklist = Boolean(section.bullets?.length);
          return (
            <section
              key={section.heading}
              className={`rounded-[28px] border p-6 shadow-[0_18px_42px_rgba(15,23,42,0.06)] sm:p-8 ${
                isChecklist
                  ? "border-blue-200 bg-[linear-gradient(180deg,rgba(37,99,235,0.06),rgba(255,255,255,1))]"
                  : "border-[color:var(--border)] bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                {isChecklist ? (
                  <span className="mt-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                    Action
                  </span>
                ) : null}
                <h2 className="headline-font text-2xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-3xl">
                  {section.heading}
                </h2>
              </div>
              <SectionBody section={section} skipBullets={isChecklist} />
              {section.bullets ? (
                <ol className="mt-5 space-y-3">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bullet}
                      className="flex gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                        {bulletIndex + 1}
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ol>
              ) : null}
              <SectionImageBlock
                section={section}
                index={index}
                sectionImageChunks={sectionImageChunks}
              />
              {index === 1 ? (
                <div className="mt-6">
                  <SponsoredAdSlot compact />
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
    );
  }

  return null;
}
