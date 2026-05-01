import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	ArticleStyle,
} from '../../constants/articleProps';
import { Select } from '../../ui/select/Select';
import { RadioGroup } from '../../ui/radio-group/RadioGroup';
import { Separator } from '../../ui/separator/Separator';
import clsx from 'clsx';

import { useState, useRef, useEffect, SyntheticEvent } from 'react';

import styles from './ArticleParamsForm.module.scss';

type FormProps = {
	setCurrentArticleState: React.Dispatch<React.SetStateAction<ArticleStyle>>;
};

export const ArticleParamsForm = (props: FormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const formRef = useRef<HTMLElement | null>(null);

	const [articleFormFont, setArticleFormFont] = useState(
		defaultArticleState.fontFamilyOption
	);
	const [articleFormSize, setArticleFormSizet] = useState(
		defaultArticleState.fontSizeOption
	);
	const [articleFormColor, setArticleFormColor] = useState(
		defaultArticleState.fontColor
	);
	const [articleFormContentWidth, setArticleFormContentWidth] = useState(
		defaultArticleState.contentWidth
	);
	const [articleFormBackgroundColors, setArticleFormBackgroundColors] =
		useState(defaultArticleState.backgroundColor);

	const clickFormButton = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setIsFormOpen(false);
			if (formRef.current.classList.contains(styles.container_open)) {
				formRef.current.classList.remove(styles.container_open);
			}
		}
	};

	useEffect(() => {
		if (isFormOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		} else {
			document.removeEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isFormOpen]);

	const handleSubmit = (event: SyntheticEvent) => {
		event.preventDefault();
		const currentArticleStyle: ArticleStyle = {
			fontFamilyOption: articleFormFont,
			fontSizeOption: articleFormSize,
			fontColor: articleFormColor,
			contentWidth: articleFormContentWidth,
			backgroundColor: articleFormBackgroundColors,
		};
		props.setCurrentArticleState(currentArticleStyle);
	};

	const handleReset = () => {
		setArticleFormFont(defaultArticleState.fontFamilyOption);
		setArticleFormSizet(defaultArticleState.fontSizeOption);
		setArticleFormColor(defaultArticleState.fontColor);
		setArticleFormContentWidth(defaultArticleState.contentWidth);
		setArticleFormBackgroundColors(defaultArticleState.backgroundColor);
		props.setCurrentArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={clickFormButton} />
			<aside
				ref={formRef}
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<div className={styles.form_childrens}>
						<Text size={31} weight={800} uppercase>
							Задайте параметры
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={articleFormFont}
							title={'шрифт'}
							onChange={(option) => {
								setArticleFormFont(option);
							}}
						/>
						<RadioGroup
							name={'fsize'}
							options={fontSizeOptions}
							selected={articleFormSize}
							onChange={(value) => {
								setArticleFormSizet(value);
							}}
							title={'размер шрифта'}
						/>
						<Select
							options={fontColors}
							selected={articleFormColor}
							title={'Цвет шрифта'}
							onChange={(option) => {
								setArticleFormColor(option);
							}}
						/>
						<Separator />
						<Select
							options={backgroundColors}
							selected={articleFormBackgroundColors}
							title={'Цвет фона'}
							onChange={(option) => {
								setArticleFormBackgroundColors(option);
							}}
						/>
						<Select
							options={contentWidthArr}
							selected={articleFormContentWidth}
							title={'Ширина контента'}
							onChange={(option) => {
								setArticleFormContentWidth(option);
							}}
						/>
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
