import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Form from "./Form";
import { RecoilRoot } from "recoil";
import { act } from "react-dom/test-utils";

describe('o comportamento do Form.tsx', () => {
  test('quando o input está vazio, novos participantes não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')    //encontrar no DOM o input
    const botao = screen.getByRole('button')                                          //encontrar o botão
    expect(input).toBeInTheDocument()                                                 //garantir que o input esteja no documento
    expect(botao).toBeDisabled()                                                      //garantir que o botão esteja desabilitado
  })

  test('adicioanar um participante caso exista um nome preenchido', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
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

  test('nomes duplicados não podem ser adicionados', () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(botao)

    const errorMessage = screen.getByRole('alert')
    expect(errorMessage.textContent).toBe('Esse nome já foi adicionado!')
  })

  test('a mensagem de erro deve sumir após os timers', () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
    const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
    const botao = screen.getByRole('button')
    fireEvent.change(input, {
      target: {
        value: 'Ana Catarina'
      }
    })
    fireEvent.click(botao)
    let errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    errorMessage = screen.queryByRole('alert')
    expect(errorMessage).toBeNull()
  })
})
