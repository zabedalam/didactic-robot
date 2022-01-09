/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react/jsx-no-undef */
import TextField from '@material-ui/core/TextField';
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

                <TextField
                    defaultValue={new Date().toISOString().slice(0, 16)}
                    inputProps={{
                        // min: "2021-02-20T00:00",
                        min: new Date().toISOString().slice(0, 16),
                    }}
                    variant="outlined"
                    label="Select Date and Time"
                    placeholder="Select Date and Time"
                    type="datetime-local"
                    InputLabelProps={{
                        shrink: true,
                        style: { color: 'black' },
                    }}
                    className="input_date"
                    value={deadline}
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
