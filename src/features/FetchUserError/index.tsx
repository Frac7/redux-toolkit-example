import { memo } from "react";

import { Alert, Spin } from "antd";
import { useGetUserQuery } from "api/user";

const FetchUserError = () => {
  const { isLoading, error } = useGetUserQuery({ id: 42 });

  if (isLoading) {
    return <Spin />;
  }

  if (error) {
    const message = (
      <>
        Si è verificato un errore.
        <br />
        <code>{JSON.stringify(error)}</code>
      </>
    );
    return <Alert message={message} type="error" />;
  }

  return null;
};

export default memo(FetchUserError);
