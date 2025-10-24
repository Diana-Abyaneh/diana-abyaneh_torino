import { Suspense } from "react";
import ToursContent from "@/components/ToursContent";

function Tours() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <ToursContent/>
    </Suspense>
  )
}

export default Tours;