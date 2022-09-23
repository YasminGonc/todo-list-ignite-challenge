import { ChangeEvent, FormEvent } from 'react';

import styles from './Form.module.css'

import { PlusCircle } from 'phosphor-react';

interface Form {
    onToDo: () => void;
    onNewToDoChange: (text: string) => void;
    inputValue: string;
}

export function Form({onToDo, onNewToDoChange, inputValue}: Form) {
    function handleToDo(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onToDo();
    }

    function handleNewToDoChange(event: ChangeEvent<HTMLInputElement>) {
        onNewToDoChange(event.target.value);
    }

    return (
        <form className={styles.form} onSubmit={handleToDo}>
            <input
                type="text"
                onChange={handleNewToDoChange}
                value={inputValue}
                required
                placeholder="Adicione uma nova tarefa"
            />
            <button type='submit' >
                Criar
                <PlusCircle size={20} />
            </button>
        </form>
    );
}