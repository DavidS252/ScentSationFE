import { GoogleLogin } from "@react-oauth/google";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import SignInModal from "../components/SignInModal";
import { googleSignin } from "../services/user-service.ts";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser && JSON.parse(currentUser).username !== "default") {
      navigate({ to: "/home/me" });
    }
  }, []);

  const words = [
    {
      text: "Find",
    },
    {
      text: "your",
    },
    {
      text: "next",
    },
    {
      text: "meal",
    },
    {
      text: "with",
    },
    {
      text: "Foodie",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Finds.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <>
      <div className="h-[43rem] w-full relative">
        <div className="flex flex-col items-center justify-center h-[15rem]  ">
          <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
          </p>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
            <SignInModal />
          </div>
          <div className="flex mt-2">
            <GoogleLogin
              onSuccess={async (credRes) => {
                console.log(credRes);
                const res = await googleSignin(credRes);
                localStorage.setItem("currentUser", JSON.stringify(res));
              }}
              onError={() => console.log("Fuck")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
