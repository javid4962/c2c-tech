import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, image, canonical }) => (
  <Helmet>
    <title>{title}</title>
    {description ? <meta name="description" content={description} /> : null}
    {canonical ? <link rel="canonical" href={canonical} /> : null}
    {title ? <meta property="og:title" content={title} /> : null}
    {description ? <meta property="og:description" content={description} /> : null}
    {image ? <meta property="og:image" content={image} /> : null}
  </Helmet>
);

export default SEO;

