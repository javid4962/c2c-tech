import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import learnerHttp from "../../api/learnerHttp";
import LoadingScreen from "../../components/common/LoadingScreen";
import SEO from "../../components/common/SEO";
import { useLearnerAuth } from "../../context/LearnerAuthContext";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";
import eduTechImage from "../../assets/illustrations/edutech.svg";

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { settings } = useSite();
  const companyName = settings?.companyName || "Enterprise Brand";
  const { isAuthenticated } = useLearnerAuth();
  const [enrolling, setEnrolling] = useState(false);

  const { data: course, loading } = useAsyncData(async () => {
    const { data } = await learnerHttp.get(`/courses/${slug}`);
    return data.data;
  }, [slug], null);

  const priceLabel = useMemo(() => (Number(course?.price || 0) > 0 ? `INR ${course.price}` : "Free"), [course]);

  const handleEnroll = async () => {
    if (!course?._id) return;
    if (!isAuthenticated) {
      toast.error("Please sign in to enroll.");
      return;
    }

    try {
      setEnrolling(true);
      const { data } = await learnerHttp.post("/enrollments", { courseId: course._id });
      const enrollment = data.data;

      if (enrollment.paymentStatus === "pending") {
        await learnerHttp.post("/payments/create-intent", { enrollmentId: enrollment._id });
        toast.success("Enrollment created. Payment integration is a placeholder in v1.");
      } else {
        toast.success("Enrolled successfully.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to enroll.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) return <LoadingScreen fullScreen label="Loading course..." variant="cards" />;
  if (!course) return null;

  return (
    <>
      <SEO title={`${course.title} | ${companyName}`} description={course.shortDescription || course.description} />
      <section className="section-space">
        <div className="page-shell space-y-10">
          <div className="glass-panel overflow-hidden">
            <div className="grid gap-8 p-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Course</p>
                <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-midnight">{course.title}</h1>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  {course.shortDescription || course.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-slateblue">
                    {course.level || "Beginner"}
                  </span>
                  {course.duration ? (
                    <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-slateblue">
                      {course.duration}
                    </span>
                  ) : null}
                  <span className="rounded-full bg-[#eef4fb] px-4 py-2 text-sm font-semibold text-slateblue">
                    {priceLabel}
                  </span>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="inline-flex items-center gap-2 rounded-full bg-midnight px-6 py-3 text-sm font-bold text-white transition hover:bg-slateblue disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {enrolling ? "Enrolling..." : "Enroll now"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link to="/courses" className="pill-link">
                    Browse courses
                  </Link>
                </div>
              </div>
              <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-panel">
                <img
                  src={course.heroImage || eduTechImage}
                  alt={course.title}
                  className="h-[380px] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-panel p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Overview</p>
              <p className="mt-4 text-sm leading-7 text-slate-700">{course.description || course.shortDescription}</p>
              <div className="mt-8 space-y-4">
                {[
                  "Projects and practical exercises",
                  "Short assessments and mastery checks",
                  "Portfolio-ready artifacts",
                  "Progress tracking and completion status",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-slateblue" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-8">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-slate-500">Curriculum</p>
              <div className="mt-6 space-y-4">
                {(course.modules || []).map((module, index) => (
                  <motion.div
                    key={`${module.title}-${index}`}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.4, delay: index * 0.04 }}
                    className="rounded-[18px] border border-slate-200 bg-[#f7f9fd] p-5 shadow-panel"
                  >
                    <p className="text-sm font-bold text-midnight">{module.title}</p>
                    {module.lessons?.length ? (
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
                        {module.lessons.slice(0, 6).map((lesson) => (
                          <li key={lesson}>{lesson}</li>
                        ))}
                      </ul>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CourseDetailPage;
