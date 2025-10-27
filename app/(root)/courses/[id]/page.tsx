import React from "react";
import CourseDetail from "./CourseDetail";

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => {
  return <CourseDetail id={id} />;
};

export default Page;