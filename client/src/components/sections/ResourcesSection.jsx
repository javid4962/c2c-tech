import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSite } from "../../context/SiteContext";

const formatDate = (value) =>
  new Date(value || Date.now()).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ResourcesSection = ({ blogs = [] }) => {
  const { settings } = useSite();
  const featuredBlogs = blogs.slice(0, 4);

  return (
    <section className="section-space bg-white pt-10">
      <div className="page-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#5a74a6]">Latest Insights &amp; Resources</p>
            <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-midnight">
              Practical thinking from the {settings?.companyName || "enterprise"} insights desk.
            </h2>
          </div>
          <Link to="/blog" className="pill-link">
            Browse All Insights
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {featuredBlogs.map((blog, index) => (
            <motion.article
              key={blog._id || blog.slug || blog.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="overflow-hidden rounded-[18px] border border-slate-200 bg-white shadow-panel"
            >
              {blog.coverImage ? (
                <img src={blog.coverImage} alt={blog.title} className="h-40 w-full object-cover" loading="lazy" />
              ) : null}
              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">
                  {blog.category || "Insight"} | {formatDate(blog.publishedAt || blog.createdAt)}
                </p>
                <h3 className="mt-3 text-lg font-bold leading-7 text-midnight">{blog.title}</h3>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-slateblue"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
