import { StepLegend } from "./StepLegend";
export const wizardSteps = [
  {
    step: 0,
    title: "Nome Progetto",
  },
  {
    step: 1,
    title: "Carica le Immagini",
  },
  {
    step: 2,
    title: "Configura i Dettagli",
  },
  {
    step: 3,
    title: "Completa il Progetto",
  },
];
export const Stepper: React.FC = () => {
  return (
    <ol className="w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse dark:bg-gray-600 dark:text-gray-100 p-4 rounded-xl">
      {wizardSteps.map((step, index) => (
        <StepLegend key={index} title={step.title} step={index + 1} />
      ))}
    </ol>
  );
};