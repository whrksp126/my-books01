import { Button, PageHeader } from "antd";
import Layout from "./Layout";

export default function List() {
  const goAdd = () => {};
  const logout = () => {};
  return (
    <Layout>
      <PageHeader
        title={<div>Book LIst</div>}
        extra={[
          <Button key="2" type="primary" onClick={goAdd}>
            Add Book
          </Button>,
          <Button key="1" type="primary" onClick={logout}>
            Logout
          </Button>,
        ]}
      />
    </Layout>
  );

  function click() {}
}
