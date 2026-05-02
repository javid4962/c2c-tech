import { useParams } from "react-router-dom";
import http from "../../api/http";
import LoadingScreen from "../../components/common/LoadingScreen";
import RichTextRenderer from "../../components/common/RichTextRenderer";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSite();
  const { data: blog, loading } = useAsyncData(async () => {
    const { data } = await http.get(`/blogs/${slug}`);
    return data.data;
  }, [slug]);

  if (loading) {
    return <LoadingScreen fullScreen label="Loading article..." variant="page" />;
  }

  if (!blog) {
    return null;
  }

  return (
    <>
      <SEO
        title={`${blog.seoTitle || blog.title} | ${settings?.companyName}`}
        description={blog.seoDescription || blog.excerpt}
        image={blog.coverImage}
      />
      <section className="section-space">
        <div className="page-shell">
          <article className="mx-auto max-w-4xl overflow-hidden rounded-[36px] bg-white shadow-soft">
            {blog.coverImage ? (
              <img src={blog.coverImage} alt={blog.title} className="h-72 w-full object-cover sm:h-[380px]" loading="lazy" />
            ) : null}
            <div className="p-8 sm:p-10 lg:p-12">
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span>{blog.category}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
                <span>•</span>
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
              <h1 className="mt-5 font-display text-4xl font-bold tracking-tight text-midnight">{blog.title}</h1>
              <p className="mt-6 text-lg leading-8 text-slate-600">{blog.excerpt}</p>
              <div className="mt-8 rounded-[28px] bg-mist p-6">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-500">By {blog.author}</p>
              </div>

              <div className="mt-10">
                <RichTextRenderer content={blog.content} />
              </div>
            </div>
          </article>
        </div>
      </section>
    </>
  );
};

export default BlogDetailPage;

