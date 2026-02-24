import { useContext } from "react";
import { ActorContext } from "./ActorContext";

export const useActor = () => {
  const context = useContext(ActorContext);
  if (!context) {
    throw new Error("useActor must be used within an ActorProvider");
  }
  return context;
};
