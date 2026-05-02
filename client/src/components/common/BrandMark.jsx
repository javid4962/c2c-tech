import defaultLogo from "../../assets/logo.png";

const BrandMark = ({ settings, compact = false, light = false, wordmarkOnly = false, hero = false }) => {
  const companyName = settings?.companyName || "C2C Tech Solutions";
  const descriptor = settings?.hero?.eyebrow || "Enterprise Services Partner";
  const initials = companyName
    .split(" ")
    .map((item) => item[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  const textTone = light ? "text-white" : "text-midnight";
  const subTone = light ? "text-white/65" : "text-slate-500";
  const wordmarkSize = hero ? "text-[clamp(3rem,10vw,7rem)]" : compact ? "text-[2rem]" : "text-[2.4rem]";
  const logoSrc = settings?.logoUrl || defaultLogo;

  return (
    <div className="flex items-center gap-3">
      {wordmarkOnly ? (
        <div className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt={`${companyName} logo`}
            className={hero ? "h-20 w-auto" : compact ? "h-12 w-auto" : "h-12 w-auto"}
            loading="lazy"
          />
          <p
            className={`font-display font-bold tracking-tight ${compact ? "text-base" : "text-lg"} ${textTone}`}
          >
            {companyName}
          </p>
        </div>
      ) : (
        <>
          {logoSrc ? (
            <img
              src={logoSrc}
              alt={`${companyName} logo`}
              className={`${compact ? "h-20 w-20" : "h-22 w-22"} rounded-2xl object-cover shadow-lg`}
              loading="lazy"
            />
          ) : (
            <div
              className={`${
                compact ? "h-10 w-10 text-sm" : "h-12 w-12 text-base"
              } flex items-center justify-center rounded-2xl bg-gradient-to-br from-aqua via-[#83d8ff] to-ember font-display font-extrabold text-midnight shadow-lg`}
            >
              {initials}
            </div>
          )}
          <div>
            <p className={`font-display ${compact ? "text-base" : "text-lg"} font-bold tracking-tight ${textTone}`}>
              {companyName}
            </p>
            <p className={`text-xs uppercase tracking-[0.22em] ${subTone}`}>{descriptor}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default BrandMark;
