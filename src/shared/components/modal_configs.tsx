"use client";
import { useDesiredCropStore } from "@/app/(dashboard)/predictions/store/desired_crop_store";
import { AnimatePresence } from "framer-motion";
import DesiredCropYieldModal from "@/app/(dashboard)/predictions/components/desired_crop_yield_modal";

const ModalConfigs = () => {
  const isDesiredCropModalOpen = useDesiredCropStore((state) => state.isOpen);
  return (
    <>
      <AnimatePresence>
        {isDesiredCropModalOpen && <DesiredCropYieldModal />}
      </AnimatePresence>
    </>
  );
};

export default ModalConfigs;
