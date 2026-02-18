
import React from "react";
import EditRolePage from './EditRolePage'

interface Props {
  params: { id: string };
}

const Page = ({ params: { id } }: Props) => {
  return <EditRolePage id={id} />;
};

export default Page;