import React from 'react'
import Link from 'next/link'
import Breadcrumbs from '../_components/Breadcrumbs'

const AdminPage = () => {
  return (
    <>
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
    </>
  )
}

export default AdminPage