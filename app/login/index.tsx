import { BottomSheetProvider } from "@/contexts/BottomSheetContext";
import { UserProvider } from "@/contexts/UserContext";
import Login from "./Login";

export default function IndexLogin() {
  return (
    <BottomSheetProvider>
      <UserProvider>
        <Login />
      </UserProvider>
    </BottomSheetProvider>
  );
}
