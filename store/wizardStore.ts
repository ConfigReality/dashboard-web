"use client";
import { proxy, useSnapshot } from "valtio";
import { Database } from "@/types/supabase";
import { createClient } from "@/utils/supabase/client";
import { actions as mainActions } from "@/store/main";
export interface WizardProps {
  error: string;
  currentStep: number;
  // step1
  name: string;
  description: string;

  // step2
  files: FileList | [];
  files_url: string[];

  // step3
  detail: Database["public"]["Enums"]["details"];
  order: Database["public"]["Enums"]["orders"];
  feature: Database["public"]["Enums"]["features"];

  status: string;
  catalog_id: number | null;
  project_id: number;
  process_id: number;
}

const state = proxy<WizardProps>({
  error: "",
  currentStep: 1,

  name: "",
  description: "",

  files: [],
  files_url: [],

  detail: "reduced",
  order: "sequential",
  feature: "normal",

  status: "in queue",
  catalog_id: null,
  project_id: 0,
  process_id: 0,
});

export const useStore = () => useSnapshot(state);

const checksMandatory = [
  () => state.name.length > 0,
  () => state.files.length > 0,
  () => {
    console.log(state.detail, state.order, state.feature);
    return true;
  },
  () => true, // state.status.length > 0,
];

const checkNameExists = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("project")
    .select("name")
    .eq("name", state.name);
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const actions = {
  nextStep: async () => {
    mainActions.showLoading();
    if (state.currentStep === 4) return;
    if (!checksMandatory[state.currentStep - 1]()) {
      setTimeout(() => mainActions.hideLoading(), 100);
      return (state.error = "Compila tutti i campi obbligatori");
    }
    if (state.currentStep === 1) {
      const data = await checkNameExists();
      if (data.length > 0) {
        mainActions.hideLoading();
        return (state.error = "Nome progetto già esistente");
      }
    }
    mainActions.hideLoading();
    state.error = "";
    return (state.currentStep += 1);
  },
  prevStep: () => {
    if (state.currentStep === 0) return;
    return (state.currentStep -= 1);
  },
  goStep: (step: number) => {
    return (state.currentStep = step);
  },
  resetStep: () => {
    return (state.currentStep = 0);
  },
  resetState: () => {
    state.error = "";
    state.currentStep = 1;
    state.name = "";
    state.description = "";
    state.files = [];
    state.files_url = [];
    state.detail = "reduced";
    state.order = "sequential";
    state.feature = "normal";
    state.status = "in queue";
    state.catalog_id = null;
    state.project_id = 0;
    state.process_id = 0;
  },

  // step1
  setName: (name: string) => (state.name = name),
  setDescription: (description: string) => (state.description = description),

  // step2
  setFiles: (files: FileList | []) => {
    state.files = files;
    // iterate files and get the filename
    const files_url: string[] = [];
    for (let i = 0; i < files.length; i++) {
      files_url.push(files[i].name);
    }
    state.files_url = files_url;
  },

  // step3
  setDetail: (detail: Database["public"]["Enums"]["details"]) =>
    (state.detail = detail),
  setOrder: (order: Database["public"]["Enums"]["orders"]) =>
    (state.order = order),
  setFeature: (feature: Database["public"]["Enums"]["features"]) =>
    (state.feature = feature),

  // step4
  setStatus: (status: string) => (state.status = status),
  setCatalogId: (catalog_id: number | null) => (state.catalog_id = catalog_id),
  setProjectId: (project_id: number) => (state.project_id = project_id),
  setProcessId: (process_id: number) => (state.process_id = process_id),
};
