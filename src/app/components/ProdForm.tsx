"use client";
import { Button } from "@/components/ui/button";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaExclamationCircle } from "react-icons/fa";
import { TbTriangleSquareCircle } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { LuFolderInput } from "react-icons/lu";
import { GiWeight } from "react-icons/gi";
import { SlSizeFullscreen } from "react-icons/sl";

interface FormInputs {
  types: string;
  name: string;
  size: string;
  weight: string;
}

function ProdForm(props: any) {
  const [img, setImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisable] = useState<boolean>(true);
  
  const cloudName = process.env.CLOUD_NAME;
  const cloudPreset = process.env.CLOUD_PRESET;

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload?upload_preset=${cloudPreset}`,
          {
            method: "POST",
            body: formData,
          }
        );
        if (response.ok) {
          const ans = await response.json();
          console.log(ans);

          setImg(ans.secure_url);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    props.closeFirstModal({
      type: data.types,
      name: data.name,
      size: data.size,
      weigth: data.weight,
      photoProduct: img,
      articulosEspeciales: "noSpecial",
    });
    props.closeModal({
      type: data.types,
      name: data.name,
      size: data.size,
      weigth: data.weight,
      photoProduct: img,
      articulosEspeciales: "noSpecial",
    });
  };
  const close = () => {
    props.closeModal();
  };

  useEffect(() => {
    img && setDisable(false);
  }, [img]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imgDataUrl = reader.result as string;
        setImg(imgDataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="m-8 px-4 h-screen">
      <Button onClick={() => close()} variant={"ghost"}>
        <IoMdArrowRoundBack />
      </Button>
      <div className="flex">
        <h1 className="text-xl font-bold mb-4">¿Qué vas a enviar?</h1>
        <FaExclamationCircle className="text-slate-400" />
      </div>
      <p className="text-sm text-slate-700">
        Para poder ofrecerte las mejores opciones, detallarnos información sobre
        tu envío.
      </p>
      <form
        className="flex flex-col items-center p-2 mb-10"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex items-center border-b m-auto w-80">
          <TbTriangleSquareCircle className="text-slate-400" size={20} />
          <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="types"
            {...register("types", {
              required: { value: true, message: "Campo requerido" },
            })}
          >
            <option value="" disabled selected>
              Categoría de tu producto
            </option>
            <option value="Bebé">Bebé</option>
            <option value="Belleza">Belleza</option>
            <option value="Bricolaje y herramientas">
              Bricolaje y herramientas
            </option>
            <option value="Deportes">Deportes</option>
            <option value="Electrónica">Electrónica</option>
            <option value="Equipaje">Equipaje</option>
          </select>
        </div>
        <div className="flex items-center border-b m-auto w-80">
          <BsBoxSeam className="text-slate-400" size={20} />
          <input
            placeholder="Producto"
            className="p-3 text-slate-300"
            type="text"
            id="name"
            {...register("name", {
              required: { value: true, message: "Campo requerido" },
            })}
          />
          <IoIosArrowDown className="text-slate-400" />
        </div>
        <div className="flex items-center border-b m-auto w-80">
          <SlSizeFullscreen className="text-slate-400" size={20} />
          <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="size"
            {...register("size", {
              required: { value: true, message: "Campo requerido" },
            })}
          >
            <option value="" disabled selected>
              Tamaño
            </option>
            <option value="Pequeño">Pequeño</option>
            <option value="Mediano">Mediano</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
        <div className="flex items-center border-b m-auto w-80">
          <GiWeight className="text-slate-400" size={20}/>
          <select
            className="p-2 rounded bg-white text-slate-400 w-full"
            id="weight"
            {...register("weight", {
              required: { value: true, message: "Campo requerido" },
            })}
          >
            <option value="" disabled selected>
              Peso
            </option>
            <option value="<5kg">{`<5kg`}</option>
            <option value="5-10kg">5-10kg</option>
            <option value="15-30kg">15-30kg</option>
          </select>
        </div>

        <div className="flex flex-col justify-center items-center p-4 gap-y-5">
          <h1 className="text-2xl">Añade una imagen de tu envío</h1>
          <section
             className="border rounded-xl cursor-pointer"
             style={{
               width: "300px",
               height: "200px",
               borderColor: "gray",
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
             }}
             onClick={() => handleDivClick()}
             
           >
           {img ? (
              <img
                src={img}
                alt="Product Preview"
                style={{ maxWidth: "100%", maxHeight: "100%" , backgroundRepeat: "no-repeat" , backgroundSize: "cover" }}
              />
            ) : (
              <LuFolderInput size={70} />
            )}
          </section>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>

        <Button
          variant={"ghost"}
          disabled={disabled || !isValid}
          className="bg-pink text-white w-full p-3 m-3 rounded-xl font-bold text-lg mx-auto"
        >
          Siguiente
        </Button>
      </form>
    </div>
  );
}

export default ProdForm;
