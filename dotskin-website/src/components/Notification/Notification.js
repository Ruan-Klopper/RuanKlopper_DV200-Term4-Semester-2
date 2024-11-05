// Navbar component: Client rendered
import React, { useEffect } from "react";
import "./Notification.css";

const DeliveryNotification = () => {
  return (
    <div className="notifyBody mt-2">
      <div className="notifyTop">
        <div className="flex">
          <div className="notifyDeliveryIcon mr-2 mt-0.5"></div>
          <div className="notifyTitle">Shipment 27 Oct 2024</div>
        </div>
        {/* Backend: Should dismiss. And close the Notification item in the frontend */}
        <button className="notifyDismiss"></button>
      </div>
      <div className="notifyContent ml-6">#afne12 Out for delivery</div>
    </div>
  );
};

export default function Notification({ onClose, isOpen }) {
  return (
    <div className={`NotificationBody ${isOpen ? "open" : ""}`}>
      <div className="flex justify-between">
        <div>
          <h4>Notifications</h4>
        </div>
        <div>
          {/* Frontend: This should close the notification popup */}
          <button className="closeNotifications" onClick={onClose}></button>
        </div>
      </div>

      <div className="notificationContainer mt-4">
        <DeliveryNotification />
        <DeliveryNotification />
        <DeliveryNotification />
        {/* <h5 className="text-center">You have no Notifications</h5> */}
      </div>
    </div>
  );
}
