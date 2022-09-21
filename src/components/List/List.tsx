import styles from './List.module.css';

import { PlusCircle, Trash } from "phosphor-react";
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

                <div>
                    <Checkbox.Root id='c1'>
                        <Checkbox.Indicator />
                    </Checkbox.Root>
                    <label htmlFor="c1">
                        Terminar o desafio
                    </label>
                </div>
                <Trash />

            </div>
        </div>

    );
}