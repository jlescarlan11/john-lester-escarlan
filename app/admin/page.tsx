import Breadcrumbs from "../_components/Breadcrumbs";
import Link from "next/link";
import SignOutButton from "../_components/SignOutButton";

const AdminPage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="mb-6">
        <h1 className="text-4xl font-bold">AdminPage</h1>
      </div>
      <div className="mb-4 flex space-x-4">
        <Link
          href="/admin/project"
          className=" px-4 py-2 btn btn-primary font-semibold"
        >
          Manage Projects
        </Link>
        <SignOutButton className="btn btn-primary" />
      </div>
    </>
  );
};

export default AdminPage;
