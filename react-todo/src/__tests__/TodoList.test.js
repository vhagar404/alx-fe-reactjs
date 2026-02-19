import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

describe('TodoList', () => {
  it('renders initial todos', () => {
    render(<TodoList />);

    expect(screen.getByText('Learn React hooks')).toBeInTheDocument();
    expect(screen.getByText('Write good tests')).toBeInTheDocument();
    expect(screen.getByText('Deploy something cool')).toBeInTheDocument();
  });

  it('can add a new todo', async () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'Test RTL properly' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test RTL properly')).toBeInTheDocument();
    expect(input).toHaveValue(''); // form should clear
  });

  it('does not add empty todo', () => {
    render(<TodoList />);

    const input = screen.getByPlaceholderText(/What needs to be done?/i);
    const addButton = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // Assuming we started with 3 todos → should still be 3
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  it('can toggle a todo completion status', () => {
    render(<TodoList />);

    const firstTodo = screen.getByText('Learn React hooks');

    // Initially completed → has completed class
    expect(firstTodo).toHaveClass('completed');

    fireEvent.click(firstTodo);
    expect(firstTodo).not.toHaveClass('completed');

    fireEvent.click(firstTodo);
    expect(firstTodo).toHaveClass('completed');
  });

  it('can delete a todo', () => {
    render(<TodoList />);

    const initialCount = screen.getAllByRole('listitem').length;
    expect(initialCount).toBe(3);

    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0];
    fireEvent.click(deleteButton);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.queryByText('Learn React hooks')).not.toBeInTheDocument();
  });

  it('shows empty message when no todos left', () => {
    render(<TodoList />);

    // Delete all todos
    const deleteButtons = screen.getAllByRole('button', { name: /delete/i });
    deleteButtons.forEach((btn) => fireEvent.click(btn));

    expect(screen.getByText(/No todos yet/i)).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});

