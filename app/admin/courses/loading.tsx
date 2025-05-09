import { Skeleton } from "@/components/ui/skeleton"
import AdminLayout from "@/components/admin-layout"

export default function CoursesLoading() {
  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>

        <Skeleton className="h-[100px] w-full mb-6" />

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-32" />
          </div>

          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </AdminLayout>
  )
}
