import { useRecoilValue, useSetRecoilState } from "recoil"
import { errorState, listaParticipantesState } from "../atom"

export const useAddParticipantes = () => {
  const setLista = useSetRecoilState(listaParticipantesState)
  const lista = useRecoilValue(listaParticipantesState)
  const setErro = useSetRecoilState(errorState)

  return (nomeParticipante: string) => {
    if (lista.includes(nomeParticipante)) {
      setErro('Participante já adicionado')
      return
    }
    return setLista(listaAtual => [...listaAtual, nomeParticipante])
  }
}