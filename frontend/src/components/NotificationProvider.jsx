import React, { createContext, useContext, useState, useCallback } from "react";
import Popup from "./Popup";

const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const [notification, setNotification] = useState({
    message: "",
    type: "info",
    visible: false,
    duration: 3000,
  });

  const notify = useCallback(({ message, type = "info", duration = 3000 }) => {
    setNotification({
      message: String(message),
      type,
      visible: true,
      duration,
    });
  }, []);

  const close = useCallback(
    () => setNotification((s) => ({ ...s, visible: false })),
    []
  );

  return (
    <NotificationContext.Provider value={{ notify, close }}>
      <Popup
        message={notification.message}
        type={notification.type}
        visible={notification.visible}
        onClose={close}
        duration={notification.duration}
      />
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error("useNotification must be used within NotificationProvider");
  return context;
}
