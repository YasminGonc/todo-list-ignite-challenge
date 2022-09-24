import { useState } from 'react';
import styles from './List.module.css';

import { Form } from '../Form/Form';
import { v4 as uuidv4 } from 'uuid';
import { Check, ClipboardText, Trash } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { usePersistedState } from '../../utils/usePersistedState';

export interface toDos {
    id: string;
    text: string;
    checked: boolean;
}

export function List() {
    const [toDos, setToDos] = useState<toDos[]>([]);
    //const initialState: toDos[] = []; 

    //const [toDos, setToDos] = usePersistedState('tasks', initialState);

    const [newToDo, setNewToDo] = useState('');

    const [createToDos, setcreateToDos] = useState(0);

    const [countDoneToDos, setCountDoneToDos] = useState(0);

    const [doneToDos, setDoneToDos] = useState<toDos[]>([]);

    const [activeToDos, setActiveToDos] = useState<toDos[]>([]);

    const noneToDos = Boolean(toDos.length == 0);

    const [showAll, setShowAll] = useState(true);

    const [showDoneOnes, setShowDoneOnes] = useState(false);

    const [showActiveOnes, setShowActiveOnes] = useState(false);

    function handleNewToDoChange(text: string) { 
        setNewToDo(text);
    }

    function handleToDo() {
        setToDos([...toDos, 
            {
                id: uuidv4(),
                text: newToDo,
                checked: false
            }
        ]);

        setNewToDo('');

        setcreateToDos((state) => {
            return state + 1;
        });
    }

    function handleDoneToDos(checked: boolean | 'indeterminate', toDoId: toDos['id'], toDoChecked: toDos['checked']) {
        if (checked) {
            setCountDoneToDos((state) => {
                return state + 1;
            });
           
            const doneToDos = toDos.map(toDo => {return toDo.id == toDoId ? { ...toDo, checked: !toDo.checked} : {...toDo, checked: toDo.checked}});

            setToDos(doneToDos);
        }

        if (!checked && toDoChecked) {
            const changeDoneToDos = toDos.map(toDo => {return toDo.id == toDoId ? {...toDo, checked: !toDo.checked} : {...toDo, checked: toDo.checked}});

            setToDos(changeDoneToDos);

            setCountDoneToDos((state) => {
                return state - 1;
            });
        }

    }

    function handleDeleteToDos(toDoToDelete: string) {
        const toDoToWithoutDeletedOne = toDos.filter(toDo => {
            return toDo.id != toDoToDelete;
        });

        setToDos(toDoToWithoutDeletedOne);

        setcreateToDos((state) => {
            return state - 1;
        });

        setCountDoneToDos((state) => {
            return state - 1;
        });
    }

    function showDoneToDos() {
        const doneToDosList = toDos.filter(toDo => {
            return toDo.checked == true;
        });

        setDoneToDos(doneToDosList);
        setShowAll(false);
        setShowDoneOnes(true);
        setShowActiveOnes(false);
    }

    function showActiveToDos() {
        const activeToDosList = toDos.filter(toDo => {
            return toDo.checked == false;
        });

        setActiveToDos(activeToDosList);
        setShowAll(false);
        setShowDoneOnes(false);
        setShowActiveOnes(true);
    }

    function showAllToDos() {
        setShowAll(true);
        setShowDoneOnes(false);
        setShowActiveOnes(false);
    }

    function renderList(toDoArray: toDos[]) {
        return toDoArray.map(toDo => {
            return (
                <div key={toDo.id} className={toDo.checked ? styles.toDoListChecked : styles.toDoList}>
                    <div className={styles.toDo}>
                        <Checkbox.Root className={styles.bullet} id={toDo.id} checked={toDo.checked} onCheckedChange={(checked) => handleDoneToDos(checked, toDo.id, toDo.checked)}>
                            <Checkbox.Indicator className={styles.indicator}>
                                <Check size={13} />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <label htmlFor={toDo.id} className={toDo.checked ? styles.label : ''}>
                            {toDo.text}
                        </label>
                    </div>
                    <button className={styles.trashIcon} onClick={() => handleDeleteToDos(toDo.id)}>
                        <Trash size={18} />
                    </button>
                </div>
            );
        })
    }

    return (
        <div className={styles.container}>
            <Form 
                onToDo={handleToDo}
                onNewToDoChange={handleNewToDoChange}
                inputValue={newToDo}
            />

            <div className={styles.containerTasks}>
                <div className={styles.createdTasks}>
                    <p>Tarefas criadas</p>
                    <span>{createToDos}</span>
                </div>
                <div className={styles.completedTasks}>
                    <p>Concluídas</p>
                    <span>{countDoneToDos} de {createToDos}</span>
                </div>
            </div>

            <div className={noneToDos ? styles.displayNone : styles.categories}>
                <button onClick={showAllToDos}>Todas</button>
                <button onClick={showActiveToDos}>Ativas</button>
                <button onClick={showDoneToDos}>Finalizadas</button>
            </div>

            {noneToDos &&
                <div className={styles.noneToDos}>
                    <ClipboardText size={50} />
                    <p className={styles.pBold}>Você ainda não tem tarefas cadastradas</p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            }

            <>
                {showAll && renderList(toDos)}
                {showDoneOnes && renderList(doneToDos)}
                {showActiveOnes && renderList(activeToDos)}
            </>

        </div>

    );
}