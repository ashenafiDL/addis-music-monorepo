import { Link, useRouteError } from "react-router-dom";
import { StyledButton } from "./components/button";

export default function ErrorPage() {
  const error: any = useRouteError(); // react-router-dom doesn't have typescript support

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div>
        <h1>{error.status}</h1>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>Sorry, an unexpected error has occurred.</p>

        <div>
          <Link to="/">
            <StyledButton>Go Home</StyledButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
