import { Skeleton } from "@/components/ui/skeleton"
import ProfessionalLayout from "@/components/professional-layout"

export default function CoursesLoading() {
  return (
    <ProfessionalLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-10 w-40" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[350px] w-full" />
            ))}
          </div>
        </div>
      </div>
    </ProfessionalLayout>
  )
}
