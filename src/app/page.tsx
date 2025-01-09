"use client";

import Image from "next/image";
import banner2048 from "../../public/images/banner-game.jpg";
import bannerAgentLegend from "../../public/images/banner-agent-legend.png";
// import ButtonPlayKey from "@/components/common/ButtonPlayKey";
// import ButtonPlaySonicX from "@/components/common/ButtonPlaySonicX";
import TopRankings from "@/components/common/TopRankings";
import ButtonPlayLine from "@/components/common/ButtonPlayLine";
import { useAuthLine } from "@/hooks/use-auth-line";

export default function Home() {
  const { isLoggedIn } = useAuthLine();

  return (
    <div className="">
      <Image src={banner2048} alt="FoMoney2048" />
      <Image src={bannerAgentLegend} alt="Agent Legend" />
      <div className="mt-4 flex flex-col items-center justify-center gap-4">
        {isLoggedIn && <ButtonPlayLine />}
        {/* <ButtonPlaySonicX />
        <ButtonPlayKey /> */}
      </div>
      <p className="my-4 text-center">More games coming soon</p>
      <TopRankings />
    </div>
  );
}
