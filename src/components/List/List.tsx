import styles from './List.module.css';

import { Check, PlusCircle, Trash } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';

export function List() {
    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <input type="text" placeholder="Adicione uma nova tarefa" />
                <button>
                    Criar
                    <PlusCircle size={20} />
                </button>
            </form>

            <div className={styles.containerTasks}>
                <div className={styles.createdTasks}>
                    <p>Tarefas criadas</p>
                    <span>5</span>
                </div>
                <div className={styles.completedTasks}>
                    <p>Concluídas</p>
                    <span>2 de 5</span>
                </div>
            </div>

            <div className={styles.toDoList}>

                <div className={styles.toDo}>
                    <Checkbox.Root className={styles.bullet} id='c1'>
                        <Checkbox.Indicator className={styles.indicator}>
                            <Check size={13}/>
                        </Checkbox.Indicator>
                    </Checkbox.Root>
                    <label htmlFor="c1">
                        Terminar o desafio
                    </label>
                </div>
                <Trash className={styles.trashIcon}/>

            </div>

            <div className={styles.toDoList}>

            <div className={styles.toDo}>
                <Checkbox.Root className={styles.bullet} id='c1'>
                    <Checkbox.Indicator className={styles.indicator}>
                        <Check size={13}/>
                    </Checkbox.Indicator>
                </Checkbox.Root>
                <label htmlFor="c1">
                    Terminar o desafio
                </label>
            </div>
            <Trash className={styles.trashIcon}/>

            </div>
        </div>

    );
}