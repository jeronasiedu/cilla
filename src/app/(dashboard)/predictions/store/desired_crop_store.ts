import { create } from "zustand";
import { SoilParamsPerYield } from "@/shared/entities/reading";

type Cb = (data: SoilParamsPerYield) => void;
type DesiredCropsCb = (data: SoilParamsPerYield[]) => void;

type DefaultModalProps = {
  isOpen: boolean;
  open: (cb?: Cb) => void;
  close: () => void;
  cb?: Cb;
};
type DesiredCropsModalProps = {
  isOpen: boolean;
  open: (cb?: DesiredCropsCb) => void;
  close: () => void;
  cb?: DesiredCropsCb;
};

export const useDesiredCropStore = create<DefaultModalProps>((set) => ({
  isOpen: false,
  open: (cb) => {
    set({ isOpen: true, cb });
  },
  close: () => {
    set({ isOpen: false });
  },
}));
export const useDesiredCropsStore = create<DesiredCropsModalProps>((set) => ({
  isOpen: false,
  open: (cb) => {
    set({ isOpen: true, cb });
  },
  close: () => {
    set({ isOpen: false });
  },
}));
