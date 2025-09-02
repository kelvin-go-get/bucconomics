"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUser } from "@/services/AuthService";
import Loading from "@/components/common/Loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const user = getUser();

    if (pathname === "/") {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
      return;
    }

    if (!user && pathname !== "/login") {
      router.replace("/login");
    }

    if (user && pathname === "/login") {
      router.replace("/dashboard");
    }

    setCheckingAuth(false); // done checking
  }, [router, pathname]);

  if (checkingAuth) {
    return <Loading />;
  }

  return <>{children}</>;
}
