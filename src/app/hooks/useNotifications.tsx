import { useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getSession } from "next-auth/react";
import { SidebarContext } from "../Provider";
import { ToastContainer, toast } from "react-toastify";

interface NotificationData {
  notificationId: string;
  notification: string;
}

interface Message {
  userId: string;
  message: string;
}

interface NotificationsHook {
  sendNotification: (notificationData: NotificationData) => void;
  subscribeToNotifications: (
    callback: (data: NotificationData) => void
  ) => void;
  handleSendMessage: () => void;
  acceptNotification: (notificationId: string) => void;
  cancelNotification: (notificationId: string) => void;
  handleAcceptNotification: (notificationId: any) => void;
  handleSendInformation: (notificationId: any) => void;
}

const useNotifications = (): NotificationsHook => {
  const socketServerUrl = "https://socket-q0pz.onrender.com/";
  const socket: Socket = io(socketServerUrl);

  const [receivedMessages, setReceivedMessages] = useState<Message[]>([]);
  const [receivedNotifications, setReceivedNotifications] = useState<
    NotificationData[]
  >([]);

  useEffect(() => {
    const initializeSocket = async () => {
      // Manejar el evento de conexión
      socket.on("connect", async () => {
        console.log("Conectado al servidor de sockets");

        // Suscribirse a las notificaciones
        subscribeToNotifications((data) => {
          setReceivedNotifications((prevNotifications) => [
            ...prevNotifications,
            data,
          ]);
        });

        // ... otros eventos y lógica del socket
      });

      socket.on("receive_message", async (data: Message) => {
        try {
          const session = await getSession();

          if (!session) {
            console.warn(
              "No hay sesión disponible. "
            );
            return;
          }

          console.log("Información:", session);

          // Validar los datos recibidos antes de procesarlos
          const { userId, message } = data;
          if (!userId || !message) {
            console.error(
              "Datos recibidos no válidos en ",
              data
            );
            return;
          }

          // Actualizar el estado de manera segura
          setReceivedMessages((prevMessages) => [...prevMessages, data]);

          console.log("Mensaje recibido en el cliente:", data);

          toast.success(`Mensaje recibido de usuario con ID ${userId}: ${message}`);
          // O utilizar un componente de notificación en lugar de alert
          console.log(
            `Mensaje recibido de usuario con ID ${userId}: ${message}`
          );
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error("Error en receive_message:", error.message);
            // Puedes manejar diferentes tipos de errores aquí
          } else {
            console.error("Error inesperado en receive_message:", error);
          }
        }
      });

      socket.on(
        "notification_accepted",
        ({ notificationId, acceptingUser }) => {
          // Aquí puedes actualizar el estado del cliente según la notificación aceptada
          console.log(
            `Notificación ${notificationId} aceptada por:`,
            acceptingUser
          );

          // Puedes realizar la lógica que necesites para actualizar el estado del cliente
          // Por ejemplo, podrías marcar la notificación como aceptada en tu estado local
        }
      );

      socket.on("notification_canceled", (data: NotificationData) => {
        console.log(
          `Notificación ${data.notificationId} cancelada por el usuario`
        );
        // Puedes manejar la lógica adicional aquí si es necesario

        socket.on("alert_new_message", (data: any) => {
          console.log("Mostrar alerta:", data);
          alert(data.message);
        });
      });
    };

    initializeSocket();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  const sendNotification = (notificationData: NotificationData): void => {
    socket.emit("send_notification_to_user", notificationData);
  };

  const subscribeToNotifications = (
    callback: (data: NotificationData) => void
  ): void => {
    socket.on("receive_notification", callback);
  };

  const handleSendInformation = async () => {
    try {
      const session = await getSession();
      console.log("Información del usuario:", session);

      const userMail = session?.user?.email;

      if (!userMail) {
        throw new Error("El eamil no esta habilitado");
      }

      const userData = await fetch(`/api/auth/myid/?email=${userMail}`).then(
        (response) => response.json()
      );

      console.log("Información del usuario desde la API:", userData);
      alert(`Información del usuario desde la API: ${JSON.stringify(userData)}`);

      socket.emit("session", { session, userInfo: userData });
    } catch (error) {
      console.error(
        "Error al obtener la información del usuario desde la API:",
        error
      );
    }
  };

  const handleSendMessage = async () => {
    try {
      const userSession = await getSession();
      const user = userSession ? userSession : null;
      console.log("Mensaje enviado por", user);

      if (user) {
        const notificationData = {
          notificationId: "",
          notification: "Algo ha sucedido",
        };

        socket.emit("send_message", notificationData);

        sendNotification(notificationData);
        console.log(notificationData);
      } else {
        console.log("El usuario no está autenticado");
        // Manejar la lógica para usuarios no autenticados según sea necesario
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario:", error);
    }
  };

  const handleAcceptNotification = (
    notificationData: NotificationData
  ): void => {
    console.log("Handler de aceptar notificación:", notificationData);
    console.log("Valor de notificationData:", notificationData);
    console.log(
      "Valor de notificationData.notificationId:",
      notificationData.notificationId
    );
    const confirmAccept: boolean = window.confirm("¿Aceptar la notificación?");
    console.log("Confirmación:", confirmAccept);
    if (confirmAccept && notificationData) {
      console.log("Notificación aceptada");
      acceptNotification(notificationData.notificationId);
    }
  };

  const acceptNotification = (notificationId: string) => {
    socket.emit("accept_notification", { notificationId });
  };

  const cancelNotification = (notificationId: string) => {
    socket.emit("cancel_notification", { notificationId });
  };

  return {
    sendNotification,
    subscribeToNotifications,
    handleSendMessage,
    acceptNotification,
    cancelNotification,
    handleAcceptNotification,
    handleSendInformation,
  };
};

export default useNotifications;
