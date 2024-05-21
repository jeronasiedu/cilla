"use client";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import Spinner from "@/shared/components/spinner";
import { useAuth } from "@/shared/hooks/use_auth";
import { normalizeFirebaseError } from "@/shared/utils/errors";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { checkConnection } from "@/shared/utils/network";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleSignInLoading, setGoogleSignInLoading] = useState(false);
  const { register, continueWithGoogle } = useAuth();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    checkConnection();
    try {
      setLoading(true);
      await register(email, password);
      toast.success("Welcome to FarmChoice");
      router.replace("/");
    } catch (e: any) {
      const message = normalizeFirebaseError(e);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignIn = async () => {
    checkConnection();
    try {
      setGoogleSignInLoading(true);
      await continueWithGoogle();
      toast.success("Welcome to FarmChoice");
      router.refresh();
    } catch (error: any) {
      const message = normalizeFirebaseError(error);
      toast.error(message);
    } finally {
      setGoogleSignInLoading(false);
    }
  };

  const disableElements = loading || googleSignInLoading;
  return (
    <main className={"min-h-screen flex w-full"}>
      <article
        className={"hidden md:block w-1/2 bg-gray-100 p-8 pr-0  gradient-bg"}
      >
        <Link
          href={"/"}
          className="inline-flex justify-center items-center relative"
        >
          <span className={"text-green-600 text-2xl font-semibold"}>
            FARMCHOICE
          </span>
          <img
            src={"/leaf.svg"}
            alt={"leaf"}
            className={"absolute w-8 right-[0.2rem] -top-[1.17rem]"}
          />
        </Link>
        <div className="flex flex-col pt-32 text-white">
          <h1 className={"text-center mb-3"}>
            Manage Your Plants <br /> and Grow Anywhere.
          </h1>
          <p className={"text-gray-200 text-center mb-20"}>
            View all the analytics and grow your farm from anywhere!
          </p>
        </div>
      </article>
      <section className={"w-full md:w-1/2"}>
        <div className="md:pt-48 pt-16 p-4 flex flex-col items-center max-w-sm mx-auto">
          <Link
            href={"/"}
            className="inline-flex justify-center items-center relative lg:hidden"
          >
            <span className={"text-green-600 text-2xl font-semibold"}>
              FARMCHOICE
            </span>
            <img
              src={"/leaf.svg"}
              alt={"leaf"}
              className={"absolute w-8 right-[0.2rem] -top-[1.17rem]"}
            />
          </Link>
          <p className={"mb-2 mt-1 md:hidden"}>
            Get started with your free account
          </p>
          <h2 className={"mb-6 md:mb-2"}>Create your account</h2>
          <p className={"mb-4  hidden md:block"}>
            Get started with your free account
          </p>
          <button
            className={"btn btn-outline w-full mb-6"}
            disabled={disableElements}
            onClick={handleGoogleSignIn}
          >
            {googleSignInLoading ? (
              <Spinner />
            ) : (
              <Icon icon="flat-color-icons:google" />
            )}
            Continue with Google
          </button>
          <span className={"text-center mb-2 text-gray-600"}>OR</span>
          <form
            className={"w-full flex flex-col gap-4"}
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                disabled={disableElements}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="cilla@FarmChoice.com"
                className={"w-full"}
                required
              />
            </div>
            <div className={"relative"}>
              <label htmlFor="password">Password</label>
              <input
                type={visible ? "text" : "password"}
                name="password"
                id="password"
                value={password}
                disabled={disableElements}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={"w-full pr-12"}
                required
                minLength={6}
              />
              <button
                className={
                  "btn btn-icon absolute right-1 top-1/2 -translate-y-[0.1rem]"
                }
                type={"button"}
                onClick={() => setVisible(!visible)}
              >
                {visible ? (
                  <Icon icon={"clarity:eye-hide-solid"} />
                ) : (
                  <Icon icon={"clarity:eye-show-line"} />
                )}
              </button>
            </div>
            <button className={"btn-primary btn"} disabled={disableElements}>
              {loading ? <Spinner /> : "Sign up"}
            </button>
          </form>
          <p className={"text-center mt-4"}>
            <span>Already have an account? </span>
            <Link
              href={"/login"}
              className={"font-semibold text-primary-600 hover:underline"}
            >
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
