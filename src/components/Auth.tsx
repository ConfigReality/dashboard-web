"use client";
import { doLogin, doLoginGoogle } from "@/utils/auth";
import { Input } from "./forms/Input";

export const Auth: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 dark:bg-gray-600 dark:text-gray-100 rounded-xl shadow-md">
      <div className="my-11">
        <h1 className="text-center text-2xl">Cosa Aspetti</h1>
        <h2 className="text-center text-xl">Accedi o Registrati</h2>
      </div>
      <form className="flex flex-col w-full px-4 pb-4" onSubmit={doLogin}>
        <Input id="username" type="text" label="Username" name="username" />
        <Input id="password" type="password" label="Password" name="password" />
        <button
          className="bg-violet-500 text-white p-2 rounded-md mt-4"
          type="submit"
        >
          Accedi
        </button>
        <button
          className="border-violet-500 border border-dotted text-white p-2 rounded-md mt-4"
          type="submit"
        >
          Registrati
        </button>
      </form>

      <div className="relative flex p-4 items-center w-full">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-white">Oppure</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>

      <form className="flex flex-col w-full px-4 pb-4" onSubmit={doLoginGoogle}>
        <button className="flex flex-col items-center cursor-pointer">
          <img
            id="google"
            src="/google-logo.png"
            alt="Accedi con Google"
            className="w-16 bg-white rounded-full p-2 my-2 shadow-md cursor-pointer"
          />
          <p className="my-2">Accedi con Google</p>
        </button>
      </form>
    </div>
  );
};