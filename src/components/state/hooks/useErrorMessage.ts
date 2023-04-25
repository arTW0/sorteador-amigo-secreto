import { useRecoilValue } from "recoil"
import { errorState } from "../atom"

export const useErrorMessage = () => {
  const mensagem = useRecoilValue(errorState)
  return mensagem
}