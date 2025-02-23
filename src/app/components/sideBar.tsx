"use client";

import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../Provider";
3;
import { signOut, useSession } from "next-auth/react";
import DriveLicense from "../components/DriveLicence";
import PassportId from "../components/DniLicence";
import City from "../components/City";
import PhoneNumber from "../components/PhoneNumber";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Phone,
  FileCheck2,
  Fingerprint,
  Banknote,
  MessageSquareHeart,
  BellRing,
  ShieldCheck,
  Settings,
  LogOut,
  Building,
  ArrowRightToLine,
  Check,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { AccordionItem } from "@/components/ui/accordion";
import useUserState from "../store/sotre";
import Monedero from "./Monedero";

const Sidebar = () => {
  const { data: session } = useSession();
  const { fetchUser } = useUserState((state) => state);
  const [isIdModalOpen, setIsIdModalOpen] = useState<boolean>(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isPhoneNumber, setIsPhoneNumber] = useState<boolean>(false);
  const [isMonederoOpen, setIsMonederoOpen] = useState<boolean>(false);

  const closeMonedero = () => {
    setIsMonederoOpen(false);
  };

  const closeIdModal = () => {
    setIsIdModalOpen(false);
  };

  const closeCityModal = () => {
    setIsCityModalOpen(false);
  };

  const closePhoneNumber = () => {
    setIsPhoneNumber(false);
  };

  const navigation = useRouter();

  const { isOpen, sideBarControl } = useContext(SidebarContext);

  const logOutSession = () => {
    sideBarControl();
    signOut();

    localStorage.clear();
    if (!session) {
      sideBarControl();
      navigation.push("/prelogin");
    }
  };

  useEffect(() => {
    fetchUser(session?.user?.email!);
  }, []);

  return (
    <div className={isOpen ? "sideBarClose" : "sideBarOpen"}>
      <Command>
        <div className="m-2 flex justify-evenly items-center">
          <Avatar className="mr-2">
            <AvatarImage src={session?.user?.image!} alt="@shadcn" />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <h3>{session?.user?.name!}</h3>
          <ArrowRightToLine
            className="cursor-pointer"
            onClick={() => navigation.push("/loged/profile")}
          />
        </div>
        <CommandSeparator className="my-3" />
        <CommandList className="overflow-visible">
          <CommandGroup heading="Datos personales">
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="w-full flex"
                    onClick={() => {
                      setIsCityModalOpen(true);
                      console.log("isLicenseModalOpen", isCityModalOpen);
                    }}
                  >
                    <Building className="sideBarIcon" />
                    Ciudad
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* <p>
                      {user.profile.city
                        ? user.profile.city
                        : "Debes completar el perfil"}
                    </p> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="w-full flex"
                    onClick={() => {
                      setIsPhoneNumber(true);
                      console.log("isPhoneNumber", isPhoneNumber);
                    }}
                  >
                    <Phone className="sideBarIcon" />
                    Teléfono
                  </AccordionTrigger>
                  <AccordionContent>
                    {/* <p>
                      {user.profile.phoneNumber
                        ? user.profile.phoneNumber
                        : "Debes completar el perfil"}
                    </p> */}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="w-full flex"
                    onClick={() => navigation.push("/mobile-phone")}
                  >
                    <Check className="sideBarIcon" />
                    Validar telefono
                  </AccordionTrigger>
                  <AccordionContent></AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
            <CommandItem>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger
                    className="w-full flex"
                    onClick={() => {
                      setIsIdModalOpen(true);
                    }}
                  >
                    <Fingerprint className="sideBarIcon" />
                    Documento identificador
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>{} </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CommandItem>
          </CommandGroup>
          <CommandItem>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger
                  className="w-full flex"
                  onClick={() => setIsMonederoOpen(true)}
                >
                  <Banknote className="sideBarIcon" />
                  Monedero
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
          </CommandItem>
          <CommandGroup>
            <CommandItem>
              <ShieldCheck className="sideBarIcon" />
              Aviso Legal y Privacidad
            </CommandItem>
            <CommandItem>
              <Settings className="sideBarIcon" />
              Ajustes
            </CommandItem>
            <CommandItem>
              <button className="flex" onClick={logOutSession}>
                <LogOut className="sideBarIcon" />
                Cerrar sesion
              </button>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
      {isIdModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <PassportId closeIdModal={closeIdModal} />
          </div>
        </div>
      )}
      {isCityModalOpen && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <City closeCityModal={closeCityModal} />
          </div>
        </div>
      )}
      {isPhoneNumber && (
        <div className="fixed top-0 z-20 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <PhoneNumber closePhoneNumber={closePhoneNumber} />
          </div>
        </div>
      )}
      {isMonederoOpen && (
        <div className="fixed top-0 z-20 left-2 right-2 bottom-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl">
            <Monedero closeModal={closeMonedero} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
