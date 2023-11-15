import React from "react";

type ModalRecipeProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalRecipe: React.FC<ModalRecipeProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = () => {
    onClose();
  };

  const handleInnerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleClose}
      id="wrapper"
    >
      <div className=" flex w-[600px]  flex-col" onClick={handleInnerClick}>
        <div className="flex h-[300px] flex-col items-center justify-center rounded-lg  ">
          {children}
        </div>
      </div>
    </div>
  );
};
export default ModalRecipe;