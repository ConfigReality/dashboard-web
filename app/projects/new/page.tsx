import { Wizard } from "@/components/wizard/Wizard";

import { actions } from "@/store/main";
import { Database } from "@/types/supabase";
import { formFields } from "@/utils/constants";
import { createClient } from "@/utils/supabase/server";

// import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { toast } from "react-toastify";

async function handleSendMessage(id: number) {
  const data = await fetch("/api/sendprocess", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
  const json = await data.json();
  console.log(json);
  if (json.ok) toast.success("Process sent to queue");
  else toast.error("Error sending process to queue");
}

export default async function NewProject() {
  const supabase = createClient();

  const fields = formFields;

  const onSubmit = async ({
    name,
    description,
    files,
    detail,
    order,
    feature,
  }: any) => {
    actions.showLoading();

    const ts = new Date().getTime();
    const file_location = "test/" + ts + "/";

    const { data: _dataProject, error: _errorProject } = await supabase
      .from("Project")
      .insert({
        name,
        description,
        status: "draft",
        catalog_id: null,
        file_location,
      })
      .select("id")
      .single();

    if (_errorProject) {
      console.log("_errorProject", _errorProject);
      actions.hideLoading();
      return;
    }

    toast.success("Project created");

    console.time("upload");
    await _sendFile(files, file_location, _dataProject.id);
    console.timeEnd("upload");

    // default field for Process (detail, order, feature)
    const _defaultField = (field: any, fieldName: string) => {
      actions.hideLoading();
      return (
        field ??
        fields
          .find((f) => f.name === fieldName)
          ?.options?.find((o) => o.default)?.value
      );
    };

    const { data: _dataProcess, error: _errorProcess } = await supabase
      .from("Process")
      .insert({
        project_id: _dataProject.id,
        status: "draft",
        detail: _defaultField(detail, "detail"),
        order: _defaultField(order, "order"),
        feature: _defaultField(feature, "feature"),
      })
      .select("id")
      .single();

    if (_errorProcess) {
      console.log("_errorProcess", _errorProcess);
      actions.hideLoading();
      return;
    }

    toast.success("Process created");
    console.log("_dataProcess", _dataProcess);
    handleSendMessage(_dataProcess.id);
  };

  const _sendFile = async (
    files: FileList,
    file_location: string,
    projectId: number
  ) => {
    // upload file in supabase storage
    // eseguo sequenzialmente l'upload per dare evidenza all'utente del caricamento
    let percentage = 0;
    if (!files || files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      const { data: _dataStorage, error: _errorStorage } =
        await supabase.storage
          .from("viewer3d-dev")
          .upload(file_location + "images/" + files[i].name, files[i], {
            upsert: true,
          });

      percentage = ((i + 1) / files.length) * 100;

      if (_errorStorage) return toast.error("Error: " + files[i].name);

      toast.info("File upload " + files[i].name);

      const { data: d, error: e } = await supabase.rpc("append_array", {
        id: projectId,
        new_element: files[i].name,
      });
      console.log({ d, e });
      console.log("_dataStorage", _dataStorage, percentage);
    }
  };

  return (
    <div className="flex flex-col h-full w-full dark:bg-gray-800 dark:text-gray-100 shadow-md rounded-xl">
      <Wizard />
    </div>
  );
}