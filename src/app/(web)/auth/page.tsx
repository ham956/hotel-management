"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "next-auth-sanity/client";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const defaultFormData = {
  email: "",
  name: "",
  password: "",
};

const Auth = () => {
  const [formData, setFormData] = useState(defaultFormData);

  const inputStyles =
    "border border-gray-300 sm:text-sm text-black rounded-lg block w-full p-2.5 focus:outline-none";

  // handle input fields while user update the fields
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Signed in user
  const { data: session } = useSession();
  const router = useRouter();
  // if session is maintained then push the user to home page
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [router, session]);

  const loginHandler = async () => {
    try {
      await signIn();
      router.push("/"); // push the user to home page
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Signed up user
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await signUp(formData);
      if (user) {
        toast.success("Success! please sign in");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setFormData(defaultFormData);
    }
  };

  return (
    <section className="container mx-auto">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-80 md:w-[70%] mx-auto">
        <div className="flex mb-8 flex-col md:flex-row items-center justify-center">
          <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Create an Account
          </h1>
        </div>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="name@company.com"
            required
            className={inputStyles}
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Jhon Doe"
            required
            className={inputStyles}
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            minLength={6}
            required
            className={inputStyles}
            value={formData.password}
            onChange={handleInputChange}
          />

          <button
            type="submit"
            className="w-full bg-tertiary-dark focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white"
          >
            Sign Up
          </button>
          <div className="flex flex-col items-center">
            <p className="inline-flex items-center justify-center w-full">
              <hr className="w-64 h-px my-5 bg-gray-500 border-0 dark:bg-gray-200" />
              <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-black">
                OR
              </span>
            </p>
            <span>
              {/* Login through github */}
              {/* <AiFillGithub
              onClick={loginHandler}
              className="mr-3 text-4xl cursor-pointer text-black dark:text-white"
            />*/}
              {/* Login through google */}
              <button className="flex items-center gap-2 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm p-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
                <FcGoogle
                  onClick={loginHandler}
                  className="ml-3 text-4xl cursor-pointer"
                />
                Sign Up with Google
              </button>
            </span>
          </div>
        </form>
        Already have an account?
        <button onClick={loginHandler} className="text-blue-700 underline">
          Login
        </button>
      </div>
    </section>
  );
};

export default Auth;
