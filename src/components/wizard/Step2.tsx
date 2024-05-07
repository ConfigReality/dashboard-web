import { useState } from "react";
import { InputFile } from "../forms/InputFile";
import { WizardStep, divider, mandatory, next, nextText } from "./WizardSteps";

export const Step2: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const form = (
    <div>
      <form className="flex flex-col">
        {/* SOSTITUIRE CON https://tailwindcomponents.com/component/responsive-multi-file-upload-with-drop-on-and-preview-3 */}
        <InputFile
          id={"files"}
          disabled={false}
          label={"Carica immagini"}
          multiple={true}
          name={"files"}
          onFileChange={(e) => setFiles(e.currentTarget.files)}
          type={"file"}
        />
        {next}
      </form>

      {divider}

      {mandatory}
    </div>
  );

  const spiegone = (
    <div>
      <img src="" />
      <div className="flex flex-col">
        <p className="text-sm">STEP 2</p>
        <h1 className="text-xl">Carica immagini</h1>
        <p className="py-4">Carica le immagini del progetto.</p>
        <p className="py-4">
          Puoi caricare più immagini contemporaneamente, selezionando più file
          dalla finestra di dialogo.
        </p>
        {nextText}
      </div>
    </div>
  );

  return <WizardStep form={form} spiegone={spiegone} />;
};
