import GetStartedBtn from "./components/GetStartedBtn";

export default function Home() {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">AI flashcard generation</h1>
          <p className="mb-5">Studying has never been easier.</p>
          <GetStartedBtn />
        </div>
      </div>
    </div>
  );
}
