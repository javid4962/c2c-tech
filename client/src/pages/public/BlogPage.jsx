import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const BlogPage = () => {
  const { settings } = useSite();
  const { data: blogs, loading } = useAsyncData(async () => {
    const { data } = await http.get("/blogs");
    return data.data;
  }, []);

  if (loading) {
    return <LoadingScreen fullScreen label="Loading insights..." variant="cards" />;
  }

  return (
    <>
      <SEO
        title={`Blog | ${settings?.companyName}`}
        description="Practical thinking on premium digital experiences, AI-ready operations, talent, growth, and learning."
      />
      <section className="section-space">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Insights"
            title="Sharp thinking for leaders building modern digital, talent, and learning systems."
            description="Read practical notes on strategy, execution, polished experiences, and measurable transformation."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {blogs?.map((blog, index) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="glass-panel overflow-hidden"
              >
                {blog.coverImage ? (
                  <img src={blog.coverImage} alt={blog.title} className="h-60 w-full object-cover" loading="lazy" />
                ) : null}
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                    <span>{blog.category}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold text-midnight">{blog.title}</h2>
                  <p className="mt-4 text-base leading-8 text-slate-600">{blog.excerpt}</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {(blog.tags || []).map((tag) => (
                      <span key={tag} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-slateblue">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="mt-8 inline-flex rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                  >
                    Read article
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
