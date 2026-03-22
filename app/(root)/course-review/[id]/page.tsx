
// app/courses/[id]/page.tsx
import React from "react";
import CoureReviewDetail from "./CoureReviewDetail";

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => {
  return <CoureReviewDetail id={id} />;
};

export default Page;