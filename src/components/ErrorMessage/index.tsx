import React, { memo } from "react";

const ErrorMessage = ({ error }: { error: object }) => {
  return (
    <>
      Si è verificato un errore.
      <br />
      <code>{JSON.stringify(error)}</code>
    </>
  );
};

export default memo(ErrorMessage);
