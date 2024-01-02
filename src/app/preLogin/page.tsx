"use client";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

function PreLogin() {
  return (
    <div className="page-pink flex-col md:items-center p-5  ">
      <h2 className="onboarding-font  text-3xl font-semibold">
        Aprovecha el viaje de otra persona para enviar lo que necesites.
      </h2>
      <div className="flex flex-col">
        <Link className={buttonVariants()} href={"/register"}>
          Crear una cuenta
        </Link>
        <Link
          className={buttonVariants({
            class: "bg-white mt-2 text-black",
            variant: "ghost",
          })}
          href={"/login"}
        >
          Iniciar sesion
        </Link>
      </div>
    </div>
  );
}

export default PreLogin;
