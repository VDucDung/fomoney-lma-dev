import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function WithdrawForm() {
  return (
    <div className="rounded-lg border-[1px] border-gray-500 p-4">
      <p className="mb-4 text-xl font-bold">Withdraw</p>
      <div className="relative w-full">
        <Input
          type="number"
          placeholder="Enter amount to withdraw"
          className="pr-10"
        />
        <p className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-gray-400 px-2 text-sm text-white">
          SOL
        </p>
      </div>
      <Button className="mt-4 w-full bg-yellow-600 hover:bg-yellow-600 hover:opacity-80">
        Withdraw
      </Button>
    </div>
  );
}
