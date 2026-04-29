import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';

import { useState, useRef, useEffect, ReactNode, SyntheticEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
    children: ReactNode
	onReset: () => void
	onSubmit:() => void
}

export const ArticleParamsForm = (props: FormProps) => {

	const [state, setState] = useState(false);
	const formRef = useRef<HTMLElement | null>(null)

	const clickFormButton = () => {
		setState(!state);
		if (formRef.current) {
			formRef.current.classList.toggle(styles.container_open);
		}
	}

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setState(false);
			if (formRef.current.classList.contains(styles.container_open)) {
				formRef.current.classList.remove(styles.container_open);
			}
		}
	};

	useEffect(() => {
		if (state) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [state]);

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault()
		if(props.onSubmit) {
			props.onSubmit()
		}
	}

	const handleReset = () => {
		if(props.onReset) {
			props.onReset()
		}
	}

	return (
		<>
			<ArrowButton isOpen={state} onClick={clickFormButton} />
			<aside ref={formRef} className={styles.container}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<div className={styles.form_childrens}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры			
						</Text>
						{props.children}
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
