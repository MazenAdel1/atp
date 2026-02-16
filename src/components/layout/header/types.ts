import { Dispatch, SetStateAction } from "react";

export type HeaderProps = {
  isScrolled: boolean;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};
