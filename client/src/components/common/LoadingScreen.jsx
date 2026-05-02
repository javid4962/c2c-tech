import { SkeletonCardGrid, SkeletonDashboard, SkeletonForm, SkeletonText } from "./Skeleton";

const LoadingScreen = ({ fullScreen = false, label = "Loading...", variant = "page" }) => {
  const Wrapper = ({ children }) => (
    <div className={fullScreen ? "min-h-screen" : "min-h-[280px]"}>
      <div className="page-shell py-10 sm:py-14">{children}</div>
    </div>
  );

  if (variant === "dashboard") {
    return (
      <div className={fullScreen ? "min-h-screen" : "min-h-[280px]"}>
        <SkeletonDashboard />
      </div>
    );
  }

  if (variant === "form") {
    return (
      <Wrapper>
        <div className="space-y-6">
          <div className="glass-panel p-8 space-y-4">
            <div className="skeleton-block shimmer h-6 w-48" />
            <SkeletonText lines={2} lastWidth="w-3/5" />
          </div>
          <SkeletonForm />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{label}</p>
        </div>
      </Wrapper>
    );
  }

  if (variant === "cards") {
    return (
      <Wrapper>
        <div className="space-y-6">
          <div className="glass-panel p-8 space-y-4">
            <div className="skeleton-block shimmer h-6 w-56" />
            <SkeletonText lines={2} lastWidth="w-2/3" />
          </div>
          <SkeletonCardGrid count={4} />
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{label}</p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="glass-panel overflow-hidden p-8">
        <div className="flex items-center justify-between gap-6">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="skeleton-block shimmer h-6 w-40 sm:w-56" />
            <div className="skeleton-block shimmer h-4 w-64 sm:w-80" />
          </div>
          <div className="hidden sm:block">
            <div className="skeleton-block shimmer h-10 w-28 rounded-full" />
          </div>
        </div>
        <div className="mt-10 space-y-3">
          <div className="skeleton-block shimmer h-3 w-full" />
          <div className="skeleton-block shimmer h-3 w-11/12" />
          <div className="skeleton-block shimmer h-3 w-9/12" />
        </div>
        <p className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-slate-400">{label}</p>
      </div>
    </Wrapper>
  );
};

export default LoadingScreen;

