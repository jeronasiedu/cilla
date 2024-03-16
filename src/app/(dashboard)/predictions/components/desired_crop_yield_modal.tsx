import ModalWrapper from "@/shared/components/modal_wrapper";
import { Icon } from "@iconify/react";
import { useDesiredCropStore } from "@/app/(dashboard)/predictions/store/desired_crop_store";
import { useState } from "react";
import Spinner from "@/shared/components/spinner";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { SoilParamsPerYield } from "@/shared/entities/reading";
import { crops } from "@/shared/crops/data";

const DesiredCropYieldModal = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const crop = crops.find((c) => c.id === id);
  const close = useDesiredCropStore((state) => state.close);
  const cb = useDesiredCropStore((state) => state.cb);
  const [cropYield, setCropYield] = useState(1);
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    toast.promise(getSoilParamsPerYield, {
      error: "Error Fetching Crop Yield",
      success: (data) => {
        cb?.(data);
        return "Crop Yield Fetched Successfully";
      },
      loading: "Fetching Crop Yield",
      finally: () => {
        setLoading(false);
        close();
      },
      important: true,
    });
  };

  const getSoilParamsPerYield = async (): Promise<SoilParamsPerYield> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/get-soil-params-per-yield`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          crop: id,
          estYield: cropYield,
        }),
      },
    );
    return await response.json();
  };

  return (
    <ModalWrapper>
      <div className="flex items-center justify-between p-4 bg-white border-b md:border-b-0 sticky top-0 z-20">
        <h3 className="text-lg md:text-xl">Enter Desired {crop?.name} Yield</h3>
        <button className="btn btn-icon" onClick={close}>
          <Icon icon={"ph:x"} width={18} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className={"p-4"}>
          <label htmlFor="yield">Desired Crop Yield</label>
          <input
            type="number"
            id={"yield"}
            className={"w-full"}
            inputMode={"numeric"}
            value={cropYield}
            onChange={(e) => setCropYield(e.target.valueAsNumber)}
            required
            min={1}
            placeholder={"1830"}
          />
        </div>
        <div className="flex justify-end gap-4 sticky  bottom-0 md:border-t-0 p-4 z-30 bg-white border-t">
          <button className="btn btn-outline" type={"button"} onClick={close}>
            Cancel
          </button>
          <button className="btn btn-primary" disabled={loading}>
            {loading && <Spinner />}
            Confirm
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
};

export default DesiredCropYieldModal;
