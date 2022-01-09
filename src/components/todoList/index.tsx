import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Todo } from '../../types/types';
import SingleTodo from '../singleTodo';
import './style.css';

interface props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    CompletedTodos: Todo[];
    doing: Todo[];
    setDoing: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<props> = ({ todos, setTodos, CompletedTodos, setCompletedTodos, doing, setDoing }) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {(provided, snapshot) => (
                    <div
                        className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Todo</span>
                        {todos?.map((todo, index) => (
                            <SingleTodo index={index} todos={todos} todo={todo} key={todo.id} setTodos={setTodos} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodoDoing">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos  ${snapshot.isDraggingOver ? 'dragcomplete' : 'doing'}`}
                    >
                        <span className="todos__heading">Doing</span>
                        {doing?.map((todo, index) => (
                            <SingleTodo index={index} todos={doing} todo={todo} key={todo.id} setTodos={setDoing} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="TodosRemove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`todos  ${snapshot.isDraggingOver ? 'dragcomplete' : 'remove'}`}
                    >
                        <span className="todos__heading">Done</span>
                        {CompletedTodos?.map((todo, index) => (
                            <SingleTodo
                                index={index}
                                todos={CompletedTodos}
                                todo={todo}
                                key={todo.id}
                                setTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;
