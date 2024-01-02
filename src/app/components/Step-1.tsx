import React from "react";
import Image from "next/image";

function Step1() {
  return (
    <div className="flex  flex-col items-center  h-[420px]  ">
      <Image
        src={"/step-1.svg"}
        height={300}
        width={350}
        alt="step-1"
        className=""
      />
      <h2 className="onboarding-font text-xl mt-28  font-bold">
        Bienvenida a Packar
      </h2>
      <p className="onboarding-font-text p-3">
        Aprovecha el viaje de otro conductor para enviar tus paquetes de manera
        colaborativa, rapida y sostenible.
      </p>
    </div>
  );
}

export default Step1;
