import { memo } from "react";
import { Alert, Spin } from "antd";

import ErrorMessage from "components/ErrorMessage";

import { useGetUserQuery } from "api/user";

const FetchUserError = () => {
  const { isLoading, error } = useGetUserQuery({ id: 42 });

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    return <Alert message={<ErrorMessage error={error} />} type="error" />;
  }

  return null;
};

export default memo(FetchUserError);
