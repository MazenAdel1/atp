export default function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative h-16 w-16">
        <div className="border-yellow absolute h-full w-full animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    </div>
  );
}

export function MembershipSkeleton() {
  return (
    <section id="membership" className="section">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="bg-yellow/20 h-10 w-48 animate-pulse rounded"></div>
        <div className="h-6 w-64 animate-pulse rounded bg-white/10"></div>
      </div>
      <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-80 w-full animate-pulse rounded-lg bg-white/10"
          ></div>
        ))}
      </div>
    </section>
  );
}

export function PartnersSkeleton() {
  return (
    <section id="partners" className="section">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="bg-yellow/20 h-10 w-48 animate-pulse rounded"></div>
      </div>
      <div className="max-w-full overflow-hidden">
        <ul className="flex h-64 items-center gap-10">
          {[1, 2, 3, 4].map((i) => (
            <li
              key={i}
              className="h-full w-96 flex-1 shrink-0 animate-pulse rounded bg-white/10"
            ></li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function CoachesSkeleton() {
  return (
    <section id="coaches" className="section text-white">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="bg-yellow/20 h-10 w-48 animate-pulse rounded"></div>
      </div>
      <div className="grid w-full grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-96 w-full animate-pulse rounded-lg bg-white/10"
          ></div>
        ))}
      </div>
    </section>
  );
}

export function ContentSkeleton() {
  return (
    <section id="content" className="section">
      <div className="mb-8 flex flex-col items-center gap-4">
        <div className="bg-yellow/20 h-10 w-48 animate-pulse rounded"></div>
      </div>
      <div className="flex w-full flex-col gap-5">
        <div
          className="relative w-full overflow-hidden"
          style={{ minHeight: 476 }}
        >
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-[476px] w-[268px] shrink-0 animate-pulse rounded-lg bg-white/10"
              ></div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <div className="h-10 w-24 animate-pulse rounded bg-white/10"></div>
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-2 w-2 animate-pulse rounded bg-white/30"
              ></div>
            ))}
          </div>
          <div className="h-10 w-24 animate-pulse rounded bg-white/10"></div>
        </div>
      </div>
    </section>
  );
}

export function SportDetailSkeleton() {
  return (
    <main className="container py-10">
      <div className="absolute left-1/2 -z-10 h-52 w-11/12 -translate-x-1/2 animate-pulse rounded bg-white/10"></div>
      <div className="flex flex-col gap-10 pt-44">
        <div className="bg-yellow/20 h-12 w-64 animate-pulse px-4 py-2"></div>
        <section className="flex flex-col gap-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-yellow/20 h-8 w-48 animate-pulse rounded"></div>
              <div className="bg-yellow/20 h-0.5 flex-1 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded border border-gray-600 bg-white/5 p-4"
                ></div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
