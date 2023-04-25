import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Form from "./Form";

test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
  render(<Form />)
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')    //encontrar no DOM o input
  const botao = screen.getByRole('button')                                          //encontrar o botão
  expect(input).toBeInTheDocument()                                                 //garantir que o input esteja no documento
  expect(botao).toBeDisabled()                                                      //garantir que o botão esteja desabilitado
})

test('adicioanar um participante caso exista um nome preenchido', () => {
  render(<Form />)
  const input = screen.getByPlaceholderText('Insira os nomes dos participantes')    //encontrar no DOM o input
  const botao = screen.getByRole('button')                                          //encontrar o botão
  fireEvent.change(input, {                                                         //inserir um valor no input
    target: {
      value: 'Ana Catarina'
    }
  })
  fireEvent.click(botao)       //clicar no botão de submeter
  expect(input).toHaveFocus    //garantir que o input esteja com o foco ativo
  expect(input).toHaveValue    //garantir que o input não tenha um valor
})