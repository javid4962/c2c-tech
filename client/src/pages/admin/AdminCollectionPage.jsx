import { useParams } from "react-router-dom";
import http from "../../api/http";
import CollectionManager from "../../components/admin/CollectionManager";
import SEO from "../../components/common/SEO";
import { useSite } from "../../context/SiteContext";
import useAsyncData from "../../hooks/useAsyncData";
import { adminContentConfig } from "../../utils/adminConfig";

const AdminCollectionPage = () => {
  const { type } = useParams();
  const config = adminContentConfig[type];
  const { settings } = useSite();
  const { data: items, loading, setData } = useAsyncData(async () => {
    if (!config?.endpoint) {
      return [];
    }

    const { data } = await http.get(config.endpoint);
    return data.data;
  }, [type], []);

  const refreshItems = async () => {
    const { data } = await http.get(config.endpoint);
    setData(data.data);
  };

  const handleCreate = async (payload) => {
    await http.post(config.endpoint, payload);
    await refreshItems();
  };

  const handleUpdate = async (id, payload) => {
    await http.put(`${config.endpoint}/id/${id}`, payload);
    await refreshItems();
  };

  const handleDelete = async (id) => {
    await http.delete(`${config.endpoint}/id/${id}`);
    await refreshItems();
  };

  if (!config) {
    return null;
  }

  return (
    <>
      <SEO title={`${config.title} | ${settings?.companyName} Admin`} description={`Manage ${config.title.toLowerCase()} content.`} />
      <CollectionManager
        title={config.title}
        config={config}
        items={items}
        loading={loading}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </>
  );
};

export default AdminCollectionPage;
