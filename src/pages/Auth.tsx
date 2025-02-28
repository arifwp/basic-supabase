import TabAuth from "../components/TabAuth";

export default function Auth() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md mx-auto p-8 rounded-lg flex flex-col bg-dark-secondary">
        <TabAuth />
      </div>
    </div>
  );
}
