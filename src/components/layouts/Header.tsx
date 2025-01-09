import UserInfo from "../common/UserInfo";

import Logo from "./Logo";

export default function Header() {
  return (
    <header className="mb-2 flex items-center justify-between p-4">
      <Logo />
      <div className="flex items-center gap-1">
        <UserInfo />
        {/* <SelectToken /> */}
      </div>
    </header>
  );
}
