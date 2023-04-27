import { useListaDeParticipantes } from "./state/hooks/useListaDeParticipantes"

const ListaParticipantes = () => {
  const participantes: string[] = useListaDeParticipantes()
  return (
    <div>
      {participantes.map((participante) => (
        <li
          key={participante}
        >
          {participante}
        </li>
      ))}
    </div>
  )
}

export default ListaParticipantes