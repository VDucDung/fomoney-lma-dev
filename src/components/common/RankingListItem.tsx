import { Ranking } from "@/types/user";
import { shortenWalletAddress } from "@/utils";
import { useMemo } from "react";

interface RankingListItemProps {
  data: Ranking;
  index: number;
}
export default function RankingListItem({ data, index }: RankingListItemProps) {
  const {
    point,
    User: { wallet },
  } = data;

  const renderIndexIcon = useMemo(() => {
    switch (index) {
      case 1:
        return <span className="text-3xl">🥇</span>;
      case 2:
        return <span className="text-3xl">🥈</span>;
      case 3:
        return <span className="text-3xl">🥉</span>;
      default:
        return <span>#{index}</span>;
    }
  }, [index]);

  return (
    <div className="flex items-center justify-between rounded bg-white/10 p-2 shadow-xl backdrop-blur-xl">
      <div className="flex items-center gap-4 font-semibold">
        <p className="w-10 font-normal">{renderIndexIcon}</p>
        <p>{shortenWalletAddress(wallet, 4)}</p>
      </div>
      <p className="font-semibold text-yellow-400">
        {point.toLocaleString("en-US")}{" "}
        <span className="text-xs text-gray-400">pts</span>
      </p>
    </div>
  );
}
