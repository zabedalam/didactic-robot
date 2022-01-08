import { Component } from 'react';

export default class Todos extends Component {
    state = {
        newTodo: '',
        todos: ['hello there', 'general kenobi'],
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!this.state.newTodo) return;

        const todos = [this.state.newTodo, ...this.state.todos];
        this.setState({ newTodo: '', todos });
    };

    removeTodo = (removeIndex: number) => {
        const todos = this.state.todos.filter((_, index) => index !== removeIndex);
        this.setState({ todos });
    };

    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 500,
                    margin: '0 auto',
                    padding: 8,
                }}
            >
                <h2 style={{ textAlign: 'center' }}>Todo</h2>
                <form onSubmit={this.onSubmit} style={{ display: 'flex', marginBottom: 8 }}>
                    <input
                        type="text"
                        name="newTodo"
                        id="newTodo"
                        value={this.state.newTodo}
                        onChange={(e) => this.setState({ newTodo: e.target.value })}
                        placeholder="Fix the thing.."
                        style={{
                            display: 'inline-flex',
                            flex: 1,
                            padding: 4,
                            border: '1px solid #eaeaea',
                            marginRight: 4,
                        }}
                    />
                    <button type="submit" style={{ borderColor: '#eaeaea', backgroundColor: '#fff' }}>
                        Add
                    </button>
                </form>
                <div>
                    {this.state.todos.length === 0 && <div style={{ textAlign: 'center' }}>Add some todos</div>}
                    {this.state.todos.map((todo, i) => (
                        <div
                            key={`${todo}-${i}`}
                            style={{
                                padding: 4,
                                borderBottom: '1px solid #ccc',
                                display: 'flex',
                            }}
                        >
                            <span style={{ flex: 1 }}>{todo}</span>
                            <span style={{ cursor: 'pointer' }} onClick={() => this.removeTodo(i)}>
                                &times;
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
