import { memo } from "react";

import { Alert, Spin } from "antd";
import { useGetUserQuery } from "api/user";

const FetchUserError = () => {
  const { isLoading, error } = useGetUserQuery("42");

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={JSON.stringify(error)} type="error" />;
  }

  return null;
};

export default memo(FetchUserError);
