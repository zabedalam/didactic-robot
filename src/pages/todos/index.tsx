import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import TodoInput from '../../components/todoInput';
import TodoList from '../../components/todoList';
import { Todo } from '../../types/types';
import './style.css';

const App: React.FC = () => {
    const [todo, setTodo] = useState<string>('');
    const [deadline, setDeadline] = useState<string>('');

    // const [todos, setTodos] = useState<Todo[]>([]);
    const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);
    const [doing, setDoing] = useState<Todo[]>([]);
    //New
    const [todos, setTodos] = React.useState<Todo[]>([
        {
            id: Date.now(),
            todo: 'Hello',
            isDone: false,
            deadline: new Date().toDateString(),
        },
    ]);

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();

        if (todo && deadline) {
            setTodos([...todos, { id: Date.now(), todo, deadline, isDone: false }]);
            setTodo('');
        } else {
            alert('Please fill all the inputs');
        }
    };

    const onDragEnd = (result: DropResult) => {
        const { destination, source } = result;

        console.log(result);

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        let add;
        const active = todos;
        const complete = CompletedTodos;
        const progress = doing;
        if (source.droppableId === 'TodosList') {
            add = active[source.index];
            active.splice(source.index, 1);
        } else if (source.droppableId === 'TodoDoing') {
            add = progress[source.index];
            progress.splice(source.index, 1);
        } else {
            add = complete[source.index];
            complete.splice(source.index, 1);
        }

        if (destination.droppableId === 'TodosList') {
            active.splice(destination.index, 0, add);
        } else if (destination.droppableId === 'TodoDoing') {
            progress.splice(destination.index, 0, add);
        } else {
            complete.splice(destination.index, 0, add);
        }

        setCompletedTodos(complete);
        setTodos(active);
        setDoing(progress);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="App">
                <span className="heading">TODO</span>
                <TodoInput
                    todo={todo}
                    setTodo={setTodo}
                    handleAdd={handleAdd}
                    deadline={deadline}
                    setDeadline={setDeadline}
                />

                <TodoList
                    todos={todos}
                    setTodos={setTodos}
                    CompletedTodos={CompletedTodos}
                    setCompletedTodos={setCompletedTodos}
                    doing={doing}
                    setDoing={setDoing}
                />
            </div>
        </DragDropContext>
    );
};

export default App;
