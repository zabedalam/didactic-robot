/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-undef */
import React, { useRef } from 'react';
import './style.css';

interface props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
    deadline: string;
    setDeadline: React.Dispatch<React.SetStateAction<string>>;
}

const TodoInput: React.FC<props> = ({ todo, setTodo, deadline, setDeadline, handleAdd }) => {
    // function disablePrevDates(startDate:string) {
    //   const startSeconds = Date.parse(startDate);
    //   return (date:string) => {
    //     return Date.parse(date) < startSeconds;
    //   }
    // }

    const disablePastDate = () => {
        const today = new Date();
        const dd = String(today.getDate() + 1).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    };

    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <form
                className="input"
                onSubmit={(e) => {
                    handleAdd(e);
                    inputRef.current?.blur();
                }}
                style={{ display: 'flex', marginBottom: 8 }}
            >
                <input
                    type="text"
                    value={todo}
                    ref={inputRef}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Add New Task.."
                    className="input__box"
                />

                <input
                    type="date"
                    className="input_date"
                    value={deadline}
                    min={disablePastDate()}
                    onChange={(e) => {
                        setDeadline(e.target.value);
                    }}
                />
                <button type="submit" className="input_submit">
                    Add
                </button>
            </form>
        </>
    );
};

export default TodoInput;
