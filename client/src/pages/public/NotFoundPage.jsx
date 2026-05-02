import { Link } from "react-router-dom";
import SEO from "../../components/common/SEO";

const NotFoundPage = () => (
  <>
    <SEO title="Page Not Found" description="The page you are looking for could not be found." />
    <section className="section-space">
      <div className="page-shell">
        <div className="glass-panel mx-auto max-w-2xl p-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-slate-500">404</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-midnight">This page has moved or does not exist.</h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            Use the main navigation to continue exploring the site.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
          >
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  </>
);

export default NotFoundPage;
