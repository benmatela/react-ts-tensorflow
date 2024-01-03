import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/layout/Navbar";
import { IMenuListItem } from "../../models/menu-list-item.model";
import { Footer } from "../../components/layout/Footer";
import { ImagePrediction } from "../tensorflow/ImagePrediction";

export const Home = () => {
  const menuItems: IMenuListItem[] = [
    { id: 0, name: "Home", selected: false, icon: {}, linkTo: "/" },
    { id: 1, name: "Menu 2", selected: false, icon: {}, linkTo: "/" },
    { id: 2, name: "Menu 3", selected: false, icon: {}, linkTo: "/" },
  ];
  const [isInitLoad, setIsInitLoad] = useState(true);

  useEffect(() => {
    if (isInitLoad) {
      setIsInitLoad(false);
    }
  });

  return (
    <>
      <Navbar menuItems={menuItems} />
      <ImagePrediction />
      <Footer />
    </>
  );
};
