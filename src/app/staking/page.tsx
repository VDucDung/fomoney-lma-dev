import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import DepositForm from "@/components/deposit/DepositForm";
import WithdrawForm from "@/components/common/WithdrawForm";
import DepositSummary from "@/components/deposit/DepositSummary";

export default function DepositPage() {
  return (
    <div className="p-4">
      <DepositSummary />
      <Tabs defaultValue="deposit" className="mt-10 w-full">
        <TabsList className="w-full">
          <TabsTrigger className="flex-1" value="deposit">
            Deposit
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="withdraw">
            Withdraw
          </TabsTrigger>
        </TabsList>
        <TabsContent value="deposit">
          <DepositForm />
        </TabsContent>
        <TabsContent value="withdraw">
          <WithdrawForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
