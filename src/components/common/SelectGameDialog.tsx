import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { DialogHeader } from "../ui/dialog";
import Image from "next/image";
import { DAPP_QUERY_KEY, EGameType } from "@/constants";
import { useRouter } from "next/navigation";

interface SelectGameDialogProps {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void;
}

const LIST_GAMES = [
  {
    url: "/game",
    name: "FoMoney2048",
    image: "/images/logo-fomoney2048.jpg",
    type: EGameType.inner,
  },
  {
    url: "https://blast-1258367219.cos.accelerate.myqcloud.com/sonicx/agent-legend/index.html",
    name: "Agent Legend",
    image: "/images/logo-agent-legend.jpg",
    type: EGameType.embed,
  },
];

export default function SelectGameDialog({
  open,
  onOpenChange,
}: SelectGameDialogProps) {
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        {/* Overlay with full-screen coverage */}
        <DialogOverlay className="fixed inset-0 bg-black/50" />

        {/* Dialog Content centered */}
        <DialogContent
          className={`fixed left-1/2 top-1/2 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-[#10141f] p-4 text-white shadow-lg`}
        >
          <DialogHeader>
            <DialogTitle className="text-left text-lg font-bold">
              Select Game
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4">
            {LIST_GAMES.map((game) => (
              <div
                onClick={() => {
                  if (game.type === EGameType.inner) {
                    router.push(game.url);
                  } else {
                    router.push(`/game/dapp?${DAPP_QUERY_KEY}=${game.url}`);
                  }
                }}
                key={game.name}
                className="group flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-yellow-600 p-2 hover:bg-[#1a1f2e]"
              >
                <Image
                  src={game.image}
                  alt={game.name}
                  width={50}
                  height={50}
                  className="size-[48px] rounded-md object-cover"
                />
                <p className="block flex-1 text-xl group-hover:text-yellow-500">
                  {game.name}
                </p>
                <p className="group-hover:text-yellow-500">Play</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
