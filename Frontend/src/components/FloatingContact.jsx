import React, { useState } from "react";
import { Icon } from "@iconify/react";

function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {isOpen && (
        <div
          className="fixed bottom-10 right-10 bg-white rounded-full p-2 cursor-pointer hover:bg-gray-100 z-50"
          onClick={toggleChat}
        >
          <Icon icon="carbon:chat" className="w-10 h-10" color="#c9a96e" />
        </div>
      )}
      {!isOpen && (
        <div className="fixed bottom-10 right-10  rounded-lg p-2 cursor-pointer  z-50 flex flex-col items-center justify-center gap-5">
        <a href="tel:+91 8830201183"> <Icon
            icon="ph:phone-light"
            className="w-10 h-10 p-2 bg-gray-100 rounded-full"
            width={100}
            height={100}
            color="#c9a96e"
          />
          </a>
          <a href="https://wa.me/918830201183" target="_blank">
          <Icon
            icon="ph:whatsapp-logo-light"
            className="w-10 h-10 p-2 bg-gray-100 rounded-full"
            width={100}
            height={100}
            color="green"
          />
          </a>
          <Icon
            icon="fontisto:close"
            className="w-10 h-10 p-2 bg-gray-100 rounded-full"
            color="#c9a96e"
            onClick={toggleChat}
          />
        </div>
      )}
    </>
  );
}

export default FloatingContact;
