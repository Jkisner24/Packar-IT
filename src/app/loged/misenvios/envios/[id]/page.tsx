"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { IUserProductFull } from "@/app/interfaces/userProduct.interface";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MailIcon, Phone, User } from "lucide-react";

import { FaRegCalendarAlt, FaWeightHanging } from "react-icons/fa";
import { Scan, Weight } from "lucide-react";
import { GoDotFill } from "react-icons/go";

interface IStateClases {
  Cancelado: string;
  Pendiente: string;
  "En Curso": string;
  Finalizado: string;
}

const Page = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IUserProductFull>();
  const stateClasses: IStateClases = {
    Cancelado: "text-red-500",
    Pendiente: "text-yellow-500",
    "En Curso": "text-green-500",
    Finalizado: "text-blue-500",
  };
  const navigate = useRouter();
  const fetProductById = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/ProductById/?id=${id}`);
      const newProduct = await response.json();
      console.log(newProduct);
      setProduct(newProduct);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetProductById(params.id);
    console.log(product);
  }, [params.id]);
  return (
    <div className="w-screen flex flex-col justify-center">
      {product ? (
        <div className="flex w-screen items-center gap-y-2 h-screen flex-col p-4">
          <div className="flex justify-start w-full">
            <Button className="w-14" onClick={navigate.back} variant={"ghost"}>
              <IoMdArrowRoundBack />
            </Button>
          </div>

          <div className=" flex    items-center ">
            <div className="sm:flex flex-col items-center">
              <div className="flex  sm:w-screen sm:p-5 sm:justify-around justify-between">
                <div>
                  <h1 className="text-xl font-bold">{product.producto.name}</h1>
                  <p className="text-gray-500">
                    Paquete {product.producto.type.toLowerCase()}
                  </p>
                </div>

                {product.producto.size === "Pequeño" && (
                  <h2 className="font-bold text-xl ">{`${product.driverFinded.precio[0].price}€`}</h2>
                )}
                {product.producto.size === "Mediano" && (
                  <h2 className="font-bold text-xl ">{`${product.driverFinded.precio[1].price}€`}</h2>
                )}
                {product.producto.size === "Grande" && (
                  <h2 className="font-bold text-xl ">{`${product.driverFinded.precio[2].price}€`}</h2>
                )}
                {product.producto.type === "Special" && (
                  <h2 className="font-bold text-xl ">{`${75}€`}</h2>
                )}
              </div>

              <div className="flex flex-col sm:flex-row w-80 h-2/5 p-3  sm:w-2/3 justify-between sm:justify-around  rounded-xl bg-gray-50 gap-y-2  shadow-md">
                <div className=" flex   flex-col gap-y-3 ">
                  <div className="flex  flex-wrap gap-4">
                    <p className="font-bold sm:text-xl truncate sm:uppercase">
                      {product.desde.ciudad?.replaceAll("-", " ") + ""}
                    </p>
                    <p className="font-bold sm:text-xl ">
                      {product.driverFinded.horaSalida}
                    </p>
                  </div>
                  <div className="flex  gap-4">
                    <p className="font-bold sm:text-xl truncate sm:uppercase">
                      {product.hasta.ciudad?.replaceAll("-", " ")}
                    </p>
                    <p className="font-bold  sm:text-xl">
                      {product.driverFinded.horaLlegada}
                    </p>
                  </div>
                </div>
                <div className=" flex sm:flex-col justify-center  gap-3">
                  <div className="flex gap-x-2">
                    <Scan size={20} />
                    <p className="font-bold">{product.producto.size}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <Weight size={20} />
                    <p className="font-bold">{product.producto.weigth}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <FaRegCalendarAlt size={20} />
                    <p className="font-bold">{product.driverFinded.cuando}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex sm:gap-x-3 sm:flex-row flex-col gap-y-4  sm:justify-between sm:w-2/3">
            <div className="w-80 sm:w-1/2 flex p-2 items-center flex-col rounded-xl bg-gray-50 gap-y-2  shadow-md  ">
              <div className="flex text-lg  justify-start w-full">
                <p className=" sm:text-xl">Destinatario</p>
              </div>

              <div className="flex justify-evenly  sm:flex-col sm:gap-y-2  sm:justify-between  p-2 w-80 ">
                <div className="flex gap-x-2 text-sm ">
                  <User size={20} />{" "}
                  <p className=" sm:text-xl">{`${product.driverUser.fullname}`}</p>{" "}
                </div>
                <div className="flex gap-x-2  text-sm ">
                  <Phone size={20} />{" "}
                  <p className=" sm:text-xl">{`${product.driverProfile.phoneNumber}`}</p>
                </div>
              </div>
            </div>
            <div className="w-80 sm:w-1/2 flex p-2 items-center flex-col rounded-xl bg-gray-50 gap-y-2  shadow-md  ">
              <div className="flex justify-start w-full">
                <h3 className="text-lg sm:text-xl">Datos del Conductor</h3>
              </div>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-x-2  ">
                  <User />{" "}
                  <p className=" sm:text-xl">{` Nombre: ${product.driverUser.fullname}`}</p>{" "}
                </div>
                <div className="flex  gap-x-2 ">
                  <Phone />{" "}
                  <p className=" sm:text-xl">{`Telefono: ${product.driverProfile.phoneNumber}`}</p>
                </div>
                <div className="flex gap-x-2  ">
                  <MailIcon />{" "}
                  <p className=" sm:text-xl">{`Mail: ${product.driverUser.email}`}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start  w-80">
            <h3 className="font-bold">Estado</h3>
            <div className="flex  items-center">
              <p
                className={
                  stateClasses[product.estado as keyof typeof stateClasses]
                }
              >
                <GoDotFill />
              </p>
              <p>{product.estado}</p>
            </div>
            {product.estado === "Finalizado" ? (
              <p className="text-center text-sm">
                El conductor ha entregado tu pedido. Confirma que todo ha ido
                bien o puedes reportar un incidencia.
              </p>
            ) : null}
          </div>

          <Button
            disabled={product.estado !== "Finalizado"}
            className="w-80 bg-pink text-white m-5"
          >
            Envio correcto
          </Button>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
};

export default Page;
