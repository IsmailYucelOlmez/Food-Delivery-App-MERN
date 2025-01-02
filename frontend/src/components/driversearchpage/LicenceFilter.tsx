import { licenceList } from "@/config/DriverOptions";
import { Label } from "../ui/label";
import { Check} from "lucide-react";
import { ChangeEvent } from "react";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedLicences: string[];
  
};

const LicenceFilter = ({ onChange, selectedLicences}: Props) => {
  const handleLicenceesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedLicence = event.target.value;
    const isChecked = event.target.checked;

    const newLicencesList = isChecked ? [...selectedLicences, clickedLicence] : selectedLicences.filter((licence) => licence !== clickedLicence);

    onChange(newLicencesList);
  };

  const handleLicencesReset = () => onChange([]);

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">Filter By Licence</div>
        <div onClick={handleLicencesReset} className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-500" >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {licenceList.slice(0,  licenceList.length).map((licence) => {
            const isSelected = selectedLicences.includes(licence);
            
            return (
              <div className="flex">
                <input id={`licence${licence}`} type="checkbox" className="hidden" value={licence} checked={isSelected} onChange={handleLicenceesChange} />
                <Label htmlFor={`licence${licence}`} className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${ isSelected ? "border border-green-600 text-green-600" : "border border-slate-300" }`} >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {licence}
                </Label>
              </div>
            );
          })}

        
      </div>
    </>
  );
};

export default LicenceFilter;