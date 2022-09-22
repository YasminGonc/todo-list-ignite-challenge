import { ChangeEvent, FormEvent, MouseEvent, useState } from 'react';
import styles from './List.module.css';

import { Check, ClipboardText, PlusCircle, Trash } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';

interface toDos {
    text: string;
    checked: boolean;
}

export function List() {
    const [toDos, setToDos] = useState<toDos[]>([]);

    const [newToDo, setNewToDo] = useState('');

    const [createToDos, setcreateToDos] = useState(0);

    const [countDoneToDos, setCountDoneToDos] = useState(0);

    const [doneToDos, setDoneToDos] = useState<toDos[]>([]);

    const noneToDos = Boolean(toDos.length == 0);

    function handleNewToDoChange(event: ChangeEvent<HTMLInputElement>) {
        setNewToDo(event.target.value);
    }

    function handleToDo(event: FormEvent) {
        event.preventDefault();
        setToDos([...toDos, 
            {
                text: newToDo,
                checked: false
            }
        ]);
        setNewToDo('');
        setcreateToDos(createToDos + 1);
    }

    function handleDoneToDos(checked: boolean | 'indeterminate', toDoText: toDos['text']) {
        if (checked) {
            setCountDoneToDos(countDoneToDos + 1);

            setDoneToDos([...doneToDos,
                {
                    text: toDoText,
                    checked: true
                } 
            ]);
        }
    }

    function handleDeleteToDos(toDoToDelete: string) {
        const toDoToWithoutDeletedOne = toDos.filter(toDo => {
            return toDo.text != toDoToDelete;
        });

        setToDos(toDoToWithoutDeletedOne);
    }

    function showDoneToDos() {
        setToDos(doneToDos);
    }

    function showActiveToDos() {
        //update toDos with the done tasks
        for (let i = 0; i < doneToDos.length; i++){
            if(toDos[i].text == doneToDos[i].text && toDos[i].checked != doneToDos[i].checked) {
                toDos[i].checked = true;
            }
            console.log(toDos);
            const activeToDos = toDos.filter(toDo => toDo.checked == false);
            console.log(activeToDos);
        }
        
        
        
    }

    function ShowAllToDos() {
        for (let i = 0; i < doneToDos.length; i++){
            if(toDos[i].text == doneToDos[i].text && toDos[i].checked != doneToDos[i].checked) {
                toDos[i].checked = true;
            }
            //setToDos(toDos);
        }  
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleToDo}>
                <input
                    type="text"
                    onChange={handleNewToDoChange}
                    value={newToDo}
                    required
                    placeholder="Adicione uma nova tarefa"
                />
                <button type='submit' >
                    Criar
                    <PlusCircle size={20} />
                </button>
            </form>

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

            {noneToDos &&
                <div className={styles.noneToDos}>
                    <ClipboardText size={50} />
                    <p className={styles.pBold}>Você ainda não tem tarefas cadastradas</p>
                    <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
            }

            {toDos.map(toDo => {
                return (

                    <div key={toDo.text} className={styles.toDoList}>
                        <div className={styles.toDo}>
                            <Checkbox.Root className={styles.bullet} id={toDo.text} onCheckedChange={(checked) => handleDoneToDos(checked, toDo.text)}>
                                <Checkbox.Indicator className={styles.indicator}>
                                    <Check size={13} />
                                </Checkbox.Indicator>
                            </Checkbox.Root>
                            <label htmlFor={toDo.text}>
                                {toDo.text}
                            </label>
                        </div>
                        <button className={styles.trashIcon} onClick={() => handleDeleteToDos(toDo.text)}>
                            <Trash size={18} />
                        </button>
                    </div>
                );


            })}

            <div className={noneToDos ? styles.displayNone : styles.categories}>
                <button onClick={ShowAllToDos}>Todas</button>
                <button onClick={showActiveToDos}>Ativas</button>
                <button onClick={showDoneToDos}>Finalizadas</button>
            </div>

        </div>

    );
}