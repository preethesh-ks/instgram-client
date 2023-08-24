import { Button, Result } from "antd";
import React from "react";

const NotFound = () => {
  return (
    <div className="access-denied">
      <div className="grid h-screen mt-8">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          extra={
            <Button
              type="primary"
              onClick={() => (window.location.href = "/home")}
            >
              Back to Dashboard
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default NotFound;
