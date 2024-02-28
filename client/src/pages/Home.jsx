import Feed from "../components/Feed";
import Layout from "../components/layout/user/Layout";

export default function Home() {
  return (
    <Layout>
      <div className="max-w-[768px] mx-auto ">
        <Feed />
      </div>
    </Layout>
  );
}
