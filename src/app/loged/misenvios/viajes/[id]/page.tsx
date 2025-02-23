"use client";
import { useEffect, useState } from "react";

import { ITravelEnvioDB } from "@/app/interfaces/TravelDB.interface";
import { CalendarDays, CheckCircle2, X, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FiMapPin } from "react-icons/fi";
import { IoTime } from "react-icons/io5";

import { SendModal } from "@/app/components/sendModal";
import { Button } from "@/components/ui/button";
import TravelEditModal from "@/app/components/TravelEditModal";

const Page = ({ params }: { params: { id: string } }) => {
  const [travel, setTravel] = useState<ITravelEnvioDB | null>(null);
  const [open, setOpen] = useState(false);
  const [openTravel, setOpenTravel] = useState(false);
  const navigate = useRouter();
  const size = ["Pequeño", "Mediano", "Grande"];
  const closeModal = () => {
    setOpen(false);
  };
  const closeEditModal = () => {
    setOpenTravel(false);
  };

  const fetTravelById = async (id: string) => {
    try {
      const response = await fetch(`/api/auth/getTravelById/?id=${id}`);
      const newTravel: ITravelEnvioDB = await response.json();
      console.log(newTravel);
      setTravel(newTravel);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetTravelById(params.id);
    console.log(travel);
  }, [params.id]);
  return (
    <div className="w-screen flex flex-col justify-center items-center">
      {travel ? (
        <div className=" flex gap-y-5  flex-col items-center">
          <div className="w-full flex flex-col p-5 justify-start h-20">
            <button className="text-3xl" onClick={navigate.back}>
              <MdKeyboardArrowLeft />
            </button>
            <h2 className="text-xl sm:text-2xl sm:ml-20 font-bold ml-5">
              Tu viaje
            </h2>
          </div>
          <div className=" flex flex-col gap-y-4 sm:justify-evenly  sm:flex-row sm:w-screen">
            <div className=" flex sm:w-2/5 p-2 w-96 flex-col rounded-xl bg-gray-50  shadow-md justify-around ">
              <div className="flex mb-2">
                <div className="md:flex  items-center w-full">
                  <div className="flex w-full flex-col">
                    <div className="flex w-full  items-center gap-x-2">
                      <FiMapPin />
                      <p>
                        <span className="font-semibold">Desde:</span>{" "}
                        {`${travel.desde.pais}, ${travel.desde.calle}`}
                      </p>
                    </div>
                    <div className="flex w-full  items-center gap-x-2">
                      <IoTime />
                      <p>
                        <span className="font-semibold">Salida:</span>
                        {` ${travel.horaSalida}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col w-full ">
                    <div className="flex w-full  items-center gap-x-2">
                      <FiMapPin />
                      <p>
                        {" "}
                        <span className="font-semibold">Hasta:</span>
                        {` ${travel.hasta.pais}, ${travel.hasta.calle}`}
                      </p>
                    </div>
                    <div className="flex w-full  items-center gap-x-2">
                      <IoTime />
                      <p>
                        {" "}
                        <span className="font-semibold">Llegada:</span>
                        {` ${travel.horaLlegada}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center ">
                <CalendarDays />
                {travel.cuando}
              </div>
            </div>
            <div className="sm:w-2/5 ">
              <div className="flex flex-col gap-2 w-full justify-center">
                {travel.precio.map((travel, i) => {
                  return (
                    <div
                      key={i}
                      className="border-2 mb-1 mx-2 relative  border-slate-300 rounded p-4"
                    >
                      <div className="bg-pink top-[-10px] left-[-10px] w-1/4 h-6 text-white absolute  text-center text-[15px] font-bold justify-center rounded-md">
                        {size[i]}
                      </div>
                      <div className="flex justify-evenly    ">
                        <div className="flex   items-center ">
                          <p className="text-sm font-bold">
                            <span>Cantidad:</span> {travel.quantity}
                          </p>
                        </div>
                        <div className="flex   items-center ">
                          <p className="text-sm font-bold ">$</p>
                          <p className="text-sm font-bold">{travel.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-3">
            <div className=" flex p-2 items-center flex-col rounded-xl bg-gray-50  shadow-md justify-around">
              {" "}
              {travel.special ? (
                <div className="flex gap-x-2 p-2">
                  <p>Aceptas productos especiales</p>{" "}
                  <CheckCircle2 className="text-green-400" />
                </div>
              ) : (
                <div className="flex gap-x-2 p-2">
                  <p>No aceptas productos especiales</p>
                  <XCircle className="text-pink" />
                </div>
              )}
            </div>
            <div className=" flex p-2 items-center flex-col rounded-xl bg-gray-50  shadow-md justify-around">
              {travel.eresFlexible ? (
                <div className="flex gap-x-2 p-2">
                  <p>Eres flexible</p>{" "}
                  <CheckCircle2 className="text-green-400" />
                </div>
              ) : (
                <div className="flex gap-x-2 p-2">
                  <p>No eres flexible</p>
                  <XCircle className="text-pink" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center gap-x-4 w-full">
            <Button
              className="bg-pink text-white"
              onClick={() => setOpen(true)}
            >
              Administrar Envios
            </Button>
            <Button
              className="bg-pink text-white"
              onClick={() => setOpenTravel(true)}
            >
              Administrar Viaje
            </Button>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
      {open && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <SendModal closeModal={closeModal} envios={travel?.envios!} />
          </div>
        </div>
      )}
      {openTravel && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <TravelEditModal closeEditModal={closeEditModal} travel={travel!} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
