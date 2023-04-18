import { getAuthCookies, getUserDetails } from "@/redux/utils/cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";

export function withAuth<T>(WrappedComponent: React.ComponentType<T>) {
  const Wrapper = (props: T) => {
    const router = useRouter();

    useEffect(() => {
      const token = getAuthCookies().accessToken;

      if (!token || !getUserDetails().role || !getUserDetails().username) {
        router.push("/");
      }
    }, [router]);

    return <WrappedComponent {...(props as any)} />;
  };

  return Wrapper;
}
