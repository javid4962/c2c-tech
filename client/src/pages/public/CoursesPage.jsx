import { motion } from "framer-motion";
import { ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import learnerHttp from "../../api/learnerHttp";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import SectionHeading from "../../components/common/SectionHeading";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";
import eduTechImage from "../../assets/illustrations/edutech.svg";

const CoursesPage = () => {
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";
  const { data: courses, loading } = useAsyncData(async () => {
    const { data } = await learnerHttp.get("/courses");
    return data.data;
  }, []);

  if (loading) return <LoadingScreen fullScreen label="Loading courses..." variant="cards" />;

  return (
    <>
      <SEO title={`Courses | ${companyName}`} description="Browse polished, job-aligned technology and growth programs." />
      <section className="section-space">
        <div className="page-shell space-y-12">
          <SectionHeading
            eyebrow="Courses"
            title="Classy, job-aligned programs for modern digital roles."
            description="Curated learning tracks with premium visuals, practical projects, progress tracking, and outcome-led structure."
          />

          <div className="glass-panel overflow-hidden">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Learning experience</p>
                <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-midnight">
                  Learn beautifully. Practice deeply. Prove mastery.
                </h2>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  We pair structured content with practice loops, hands-on projects, short assessments, and progress
                  visibility so learners always know what to do next.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Projects", "Assessments", "Mentor support", "Certificates"].map((chip) => (
                    <span key={chip} className="rounded-full bg-mist px-4 py-2 text-sm font-semibold text-slateblue">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-panel">
                <img src={eduTechImage} alt="Course platform preview" className="h-[360px] w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {(courses || []).map((course, index) => (
              <motion.article
                key={course._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="glass-panel overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={course.heroImage || eduTechImage}
                    alt={course.title}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/35 via-transparent to-transparent" />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-slateblue">
                      {course.level || "Beginner"}
                    </span>
                    {course.duration ? (
                      <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-slateblue">
                        {course.duration}
                      </span>
                    ) : null}
                    <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-slateblue">
                      {Number(course.price || 0) > 0 ? `INR ${course.price}` : "Free"}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-bold text-midnight">{course.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {course.shortDescription || course.description}
                  </p>
                  {course.tags?.length ? (
                    <div className="mt-5 flex flex-wrap gap-3 text-sm text-slate-600">
                      {course.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2">
                          <Tag className="h-4 w-4 text-slateblue" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <Link
                    to={`/courses/${course.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-midnight px-5 py-3 text-sm font-bold text-white transition hover:bg-slateblue"
                  >
                    View details
                    <ArrowRight className="h-4 w-4" />
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

export default CoursesPage;
