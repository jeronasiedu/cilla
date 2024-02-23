"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/shared/hooks/use_auth";
import { useState } from "react";
import { checkConnection } from "@/shared/utils/network";
import Spinner from "@/shared/components/spinner";
import { normalizeFirebaseError } from "@/shared/utils/errors";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { sendPasswordResetEmail } = useAuth();
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkConnection();
    try {
      setLoading(true);
      await sendPasswordResetEmail(email);
      toast.success("Password reset email sent, please check your mail");
      router.replace("/login");
    } catch (error: any) {
      const message = normalizeFirebaseError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className={"min-h-screen flex w-full"}>
      <article
          className={"hidden md:block w-1/2 bg-gray-100 p-8 pr-0  gradient-bg"}
      >
        {/*<Image*/}
        {/*  src={"/logo_light.svg"}*/}
        {/*  alt={"Proceipt's logo"}*/}
        {/*  width={200}*/}
        {/*  height={200}*/}
        {/*/>*/}
        <h2 className={'text-white'}>Logo</h2>
        <div className="flex flex-col pt-32 text-white">
          <h1 className={"text-center mb-3"}>
            Manage Your Plants <br/> and Grow Anywhere.
          </h1>
          <p className={"text-gray-200 text-center mb-20"}>
            View all the analytics and grow your farm from anywhere!
          </p>
        </div>
      </article>
      <section className={"w-full md:w-1/2"}>
        <div className="md:pt-48 pt-16 p-4 flex flex-col items-center max-w-sm mx-auto">
          <Image
              src={"/logo_dark.svg"}
              alt={"Proceipt's logo"}
              width={200}
            height={200}
            className={"md:hidden"}
          />
          <p className={"mb-2 mt-1 md:hidden"}>
            Enter the email associated with your account.
          </p>
          <h2 className={"mb-6 md:mb-2"}>Forgot your password?</h2>
          <p className={"mb-4  hidden md:block"}>
            Enter the email associated with your account.
          </p>
          <form
            className={"w-full flex flex-col gap-4"}
            onSubmit={handlePasswordReset}
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                name="email"
                id="email"
                placeholder="jeron@proceipt.com"
                className={"w-full"}
                required
              />
            </div>
            <button className={"btn-primary btn"} disabled={loading}>
              {loading ? <Spinner /> : "Send Reset Link"}
            </button>
          </form>
          <p className={"text-center mt-4"}>
            <Link
              href={"/login"}
              className={"font-semibold text-primary-600 hover:underline"}
            >
              Wait, I remember my password
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default ResetPasswordPage;
