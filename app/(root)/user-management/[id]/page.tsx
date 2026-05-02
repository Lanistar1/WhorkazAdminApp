
// app/courses/[id]/page.tsx
import React from "react";
import UserDetailPage from "./UserDetailPage";

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => {
  return <UserDetailPage id={id} />;
};

export default Page;