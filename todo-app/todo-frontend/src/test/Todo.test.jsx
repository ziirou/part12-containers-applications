import { render, fireEvent, screen } from '@testing-library/react';
import { describe, test, beforeEach, expect, vi } from 'vitest'
import Todo from '../Todos/Todo'

describe('Todo component', () => {
  const baseTodo = { text: 'Test todo', done: false }
  const doneTodo = { text: 'Done todo', done: true }
  let deleteTodo, completeTodo

  beforeEach(() => {
    deleteTodo = vi.fn()
    completeTodo = vi.fn()
  })

  test('renders todo text', () => {
    render(<Todo todo={baseTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    expect(screen.getByText('Test todo')).not.toBeInTheDocument()
  })

  test('shows "This todo is not done" when todo.done is false', () => {
    render(<Todo todo={baseTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    expect(screen.getByText('This todo is not done')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Set as done')).toBeInTheDocument()
  })

  test('shows "This todo is done" when todo.done is true', () => {
    render(<Todo todo={doneTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    expect(screen.getByText('This todo is done')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.queryByText('Set as done')).not.toBeInTheDocument()
  })

  test('calls deleteTodo when Delete button is clicked', () => {
    render(<Todo todo={baseTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(deleteTodo).toHaveBeenCalledWith(baseTodo)
  })

  test('calls completeTodo when Set as done button is clicked', () => {
    render(<Todo todo={baseTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    fireEvent.click(screen.getByText('Set as done'))
    expect(completeTodo).toHaveBeenCalledWith(baseTodo)
  })

  test('calls deleteTodo when Delete button is clicked for done todo', () => {
    render(<Todo todo={doneTodo} deleteTodo={deleteTodo} completeTodo={completeTodo} />)
    fireEvent.click(screen.getByText('Delete'))
    expect(deleteTodo).toHaveBeenCalledWith(doneTodo)
  })
})