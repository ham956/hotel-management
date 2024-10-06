import { signUpHandler } from "next-auth-sanity";

import SanityClient from "@/libs/sanity";

export const POST = signUpHandler(SanityClient);