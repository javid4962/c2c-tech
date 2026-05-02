import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import { useLearnerAuth } from "../../context/LearnerAuthContext";

const AuthPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";
  const [mode, setMode] = useState("signin");
  const [otpSent, setOtpSent] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", password: "", phone: "", otp: "" });
  const [submitting, setSubmitting] = useState(false);
  const { login, register, requestPhoneOtp, verifyPhoneOtp } = useLearnerAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = useMemo(() => location.state?.from?.pathname || "/dashboard", [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setSubmitting(true);
      if (mode === "signin") {
        await login({ email: formState.email, password: formState.password });
        navigate(nextPath, { replace: true });
      } else if (mode === "register") {
        await register({ name: formState.name, email: formState.email, password: formState.password });
        navigate(nextPath, { replace: true });
      } else if (!otpSent) {
        await requestPhoneOtp({ phone: formState.phone, name: formState.name });
        setOtpSent(true);
      } else {
        await verifyPhoneOtp({ phone: formState.phone, otp: formState.otp, name: formState.name });
        navigate(nextPath, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to continue.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO title={`Learner Portal | ${companyName}`} description="Access your learning dashboard or create a new account." />
      <section className="section-space">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel p-8">
            <SectionHeading
              eyebrow="Account"
              title="Learner Portal"
              description="Sign in with email or phone OTP to access courses, enrollments, progress tracking, and certificates."
            />
            <div className="mt-8 grid rounded-[20px] border border-slate-200 bg-white p-1 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setOtpSent(false);
                }}
                className={`rounded-[16px] px-4 py-2 text-sm font-semibold transition ${
                  mode === "signin" ? "bg-midnight text-white" : "text-midnight hover:bg-slate-50"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setOtpSent(false);
                }}
                className={`rounded-[16px] px-4 py-2 text-sm font-semibold transition ${
                  mode === "register" ? "bg-midnight text-white" : "text-midnight hover:bg-slate-50"
                }`}
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("otp");
                  setOtpSent(false);
                }}
                className={`rounded-[16px] px-4 py-2 text-sm font-semibold transition ${
                  mode === "otp" ? "bg-midnight text-white" : "text-midnight hover:bg-slate-50"
                }`}
              >
                Phone OTP
              </button>
            </div>
            <div className="mt-8 space-y-4 text-sm leading-7 text-slate-600">
              <div className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-5 shadow-panel">
                <p className="font-semibold text-midnight">What you get</p>
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  <li>Course catalog and enrollment</li>
                  <li>Progress tracking and completion status</li>
                  <li>Certificates for eligible completions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">
              {mode === "signin" ? "Sign in" : mode === "register" ? "Register" : "Phone OTP"}
            </p>
            <h2 className="mt-4 font-display text-3xl font-bold text-midnight">
              {mode === "signin" ? "Welcome back." : mode === "register" ? "Create your account." : "Continue with your phone."}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              {mode === "signin"
                ? "Use your email and password to access your account."
                : mode === "register"
                  ? "Enter your details to create an account. You can also use phone OTP for quick access."
                  : "Enter a mobile number with country code. We will send a one-time verification code."}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {mode === "register" || mode === "otp" ? (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-midnight">Full name</label>
                  <input
                    type="text"
                    value={formState.name}
                    onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                    className="w-full rounded-2xl border-slate-200 bg-white"
                    required={mode === "register"}
                  />
                </div>
              ) : null}

              {mode === "otp" ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-midnight">Phone number</label>
                    <input
                      type="tel"
                      value={formState.phone}
                      onChange={(event) => setFormState((current) => ({ ...current, phone: event.target.value }))}
                      className="w-full rounded-2xl border-slate-200 bg-white"
                      placeholder="+917093182525"
                      required
                      disabled={otpSent}
                    />
                  </div>
                  {otpSent ? (
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-midnight">Verification code</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formState.otp}
                        onChange={(event) => setFormState((current) => ({ ...current, otp: event.target.value }))}
                        className="w-full rounded-2xl border-slate-200 bg-white"
                        placeholder="6-digit OTP"
                        required
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-midnight">Email</label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(event) => setFormState((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-2xl border-slate-200 bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-midnight">Password</label>
                    <input
                      type="password"
                      value={formState.password}
                      onChange={(event) => setFormState((current) => ({ ...current, password: event.target.value }))}
                      className="w-full rounded-2xl border-slate-200 bg-white"
                      required
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-midnight px-5 py-3.5 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting
                  ? "Please wait..."
                  : mode === "signin"
                    ? "Sign in"
                    : mode === "register"
                      ? "Create account"
                      : otpSent
                        ? "Verify and continue"
                        : "Send OTP"}
              </button>
              {mode === "otp" && otpSent ? (
                <button
                  type="button"
                  onClick={() => {
                    setOtpSent(false);
                    setFormState((current) => ({ ...current, otp: "" }));
                  }}
                  className="w-full text-sm font-semibold text-slateblue"
                >
                  Use a different phone number
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthPage;
