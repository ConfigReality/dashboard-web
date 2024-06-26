import { Footer } from "./Footer";

interface ModelLayoutProp {
  children: React.ReactNode;
}

export const ModelLayout: React.FC<ModelLayoutProp> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-palette1 m-4 text-white">
        <div className="flex justify-between">
          <h1 className="text-3xl font-semibold">Viewer 3D</h1>
          {/* <button className="bg-white text-palette1 p-2 rounded-md" onClick={()=>{
                }}>Change background</button> */}
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-palette1 text-white">
        <Footer />
      </footer>
    </div>
  );
};
