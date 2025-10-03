"use client";
import { FinishRegistration } from "@/components/auth/finish-register-form";

import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function OnBoardinggate() {
  // const context = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    // melhor fzr com o queryclient ou contexto???
    const user = queryClient.getQueryData(["currentUser"]);
    if (user && !(user as any).username) {
      setIsOpen(true);
    }
  }, [queryClient]);

  return (
    <>
      {/* Aqui deve ficar um modal que vai ser do finishForm */}
      <FinishRegistration isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
