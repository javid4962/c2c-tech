const shimmerBlock = (className) => <div className={`skeleton-block shimmer ${className}`} />;

export const SkeletonText = ({ lines = 3, lastWidth = "w-2/3" }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }).map((_, idx) =>
      shimmerBlock(`h-3 ${idx === lines - 1 ? lastWidth : "w-full"}`)
    )}
  </div>
);

export const SkeletonCardGrid = ({ count = 4 }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="glass-panel overflow-hidden">
        <div className="skeleton-block shimmer h-56 w-full rounded-none" />
        <div className="p-8 space-y-5">
          <div className="flex flex-wrap gap-3">
            {shimmerBlock("h-9 w-28 rounded-full")}
            {shimmerBlock("h-9 w-24 rounded-full")}
            {shimmerBlock("h-9 w-20 rounded-full")}
          </div>
          {shimmerBlock("h-7 w-3/5")}
          <SkeletonText lines={3} lastWidth="w-4/5" />
          {shimmerBlock("h-11 w-40 rounded-full")}
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonForm = () => (
  <div className="glass-panel p-8">
    <div className="space-y-4">
      {shimmerBlock("h-5 w-28")}
      {shimmerBlock("h-10 w-full")}
      {shimmerBlock("h-5 w-28")}
      {shimmerBlock("h-10 w-full")}
      {shimmerBlock("h-5 w-28")}
      {shimmerBlock("h-28 w-full")}
      {shimmerBlock("h-12 w-full rounded-full")}
    </div>
  </div>
);

export const SkeletonDashboard = () => (
  <div className="page-shell py-10 sm:py-14 space-y-10">
    <div className="glass-panel p-8 space-y-4">
      {shimmerBlock("h-6 w-52")}
      {shimmerBlock("h-4 w-80")}
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-6 shadow-panel">
            {shimmerBlock("h-3 w-24")}
            {shimmerBlock("mt-4 h-8 w-16")}
          </div>
        ))}
      </div>
    </div>
    <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
      <div className="glass-panel p-8 space-y-5">
        {shimmerBlock("h-4 w-32")}
        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="rounded-[18px] border border-slate-200 bg-white p-6 shadow-panel">
            {shimmerBlock("h-4 w-2/3")}
            {shimmerBlock("mt-3 h-3 w-1/2")}
            {shimmerBlock("mt-4 h-2 w-full rounded-full")}
          </div>
        ))}
      </div>
      <div className="glass-panel p-8 space-y-5">
        {shimmerBlock("h-4 w-28")}
        {Array.from({ length: 2 }).map((_, idx) => (
          <div key={idx} className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-6 shadow-panel">
            {shimmerBlock("h-4 w-1/2")}
            {shimmerBlock("mt-3 h-3 w-2/3")}
          </div>
        ))}
      </div>
    </div>
  </div>
);

