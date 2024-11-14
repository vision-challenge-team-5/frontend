import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative w-full md:h96">
        <Image
          src="/solar-panels.png"
          alt="태양광패널"
          width={2580}
          height={1402}
          sizes="100vw"
        ></Image>
        <div className="absolute transform -translate-y-3/4 w-full h-[500px] bg-[linear-gradient(to_bottom,_rgba(80,_98,_58,_0)_20%,_rgba(80,_98,_58,_1)_60%)]">
          <div className="text-white-green text-[6vw] leading-[1.1] font-sans font-black transform translate-x-[15vw]">
            Solar Panel
            <br />
            Contamination
            <br />
            Detection System
          </div>
        </div>
      </div>
      <div className="bg-olive-green h-[1000]"></div>
    </div>
  );
}
