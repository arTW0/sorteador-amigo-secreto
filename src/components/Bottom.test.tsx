import React from "react";
import { render, screen } from "@testing-library/react";
import { RecoilRoot } from "recoil";
import Bottom from "./Bottom";
import { useListaDeParticipantes } from "./state/hooks/useListaDeParticipantes";
import { useNavigate } from "react-router-dom";

jest.mock('./state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => {
  return {
    useNavigate: mockNavigate
  }
})

describe('onde não existem pacientes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue([])
  })
  test('a brincadeira não pode ser iniciada', () => {
    render(<RecoilRoot>
      <Bottom />
    </RecoilRoot>)

    const botao = screen.getByRole('button')
    expect(botao).toBeDisabled()
  })
})

describe('quando existem pacientes suficientes', () => {
  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(['João', 'Maria', 'José'])
  })
  test('a brincadeira pode ser iniciada', () => {
    render(<RecoilRoot>
      <Bottom />
    </RecoilRoot>)
    const botao = screen.getByRole('button')
    expect(botao).toBeEnabled()
  })
  test('a brincadeira foi iniciada', () => {
    render(<RecoilRoot>
      <Bottom />
    </RecoilRoot>)
    const botao = screen.getByRole('button')
  })
})