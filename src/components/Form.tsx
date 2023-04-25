import { useRef, useState } from "react"
import { useAddParticipantes } from "./state/hooks/useAddParticipantes"
import { useErrorMessage } from "./state/hooks/useErrorMessage"

const Form = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const adicionarNaLista = useAddParticipantes()
  const [nome, setNome] = useState<string>('')
  const errorMessage = useErrorMessage()

  const addParticipante = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setNome('')
    inputRef.current?.focus()
    adicionarNaLista(nome)
  }

  return <form onSubmit={addParticipante}>
    <input
      ref={inputRef}
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      type="text"
      placeholder="Insira os nomes dos participantes"
    />
    <button disabled={!nome}>Adicionar</button>
    {errorMessage && <p role="alert">{errorMessage}</p>}
  </form>
}

export default Form