import Breadcrumbs from "../_components/Breadcrumbs";
import Link from "next/link";
import AuthCheck from "./AuthCheck";
import SignOutButton from "../_components/SignOutButton";

const AdminPage = () => {
  return (
    <AuthCheck>
      <Breadcrumbs />
      <div className="mb-6">
        <Link
          href="/admin/project"
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary-focus transition-colors font-semibold text-sm"
        >
          Manage Projects
        </Link>
      </div>
      <div>AdminPage</div>
      <SignOutButton className="btn btn-ghost justify-start h-11 w-full text-base" />
    </AuthCheck>
  );
};

export default AdminPage;
