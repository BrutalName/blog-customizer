import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useLayoutEffect, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, fontFamilyOptions, fontSizeOptions, fontColors, backgroundColors, contentWidthArr, ArticleStyle } from './constants/articleProps';

import { Select } from './ui/select/Select'
import { RadioGroup } from './ui/radio-group/RadioGroup'
import { Separator } from './ui/separator/Separator'


import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {

	const [articleFont, setArticleFont] = useState(defaultArticleState.fontFamilyOption);
	const [articleSize, setArticleSize] = useState(defaultArticleState.fontSizeOption);
	const [articleColor, setArticleColor] = useState(defaultArticleState.fontColor);
	const [articleContentWidth, setArticleContentWidth] = useState(defaultArticleState.contentWidth);
	const [articleBackgroundColors, setArticleBackgroundColors] = useState(defaultArticleState.backgroundColor);

	const mainRef = useRef<HTMLElement | null>(null);

	const currentArticleStyle: ArticleStyle = {
		fontFamilyOption: articleFont,
		fontSizeOption: articleSize,
		fontColor: articleColor,
		contentWidth: articleContentWidth,
		backgroundColor: articleBackgroundColors,
	}

	const resetStyleForm = () => {
		setArticleFont(defaultArticleState.fontFamilyOption)
		setArticleSize(defaultArticleState.fontSizeOption)
		setArticleColor(defaultArticleState.fontColor)
		setArticleBackgroundColors(defaultArticleState.backgroundColor)
		setArticleContentWidth(defaultArticleState.contentWidth)
	}

	const submitForm = (styleForm: ArticleStyle) => {
		if (mainRef.current) {
			const style = mainRef.current.style;
			style.setProperty('--font-family', styleForm.fontFamilyOption.value);
			style.setProperty('--font-size', styleForm.fontSizeOption.value);
			style.setProperty('--font-color', styleForm.fontColor.value);
			style.setProperty('--container-width', styleForm.contentWidth.value);
			style.setProperty('--bg-color', styleForm.backgroundColor.value);
		}
	}

	useLayoutEffect(() => {
		submitForm(defaultArticleState)
	}, [])

	return (
		<main
			className={clsx(styles.main)}
			ref={mainRef}
			>
			<ArticleParamsForm
				onReset={() => {
					submitForm(defaultArticleState)
					resetStyleForm()
				}}
				onSubmit={() => {
					submitForm(currentArticleStyle)
				}}
			>
				<Select 
					options={fontFamilyOptions} 
					selected={articleFont} 
					title={'шрифт'} 
					onChange={(option) => {
						setArticleFont(option)
					}} 
				/>
				<RadioGroup
					name={'fsize'}
					options={fontSizeOptions}
					selected={articleSize}
					onChange={(value) => {
						setArticleSize(value)
					}} 
					title={'размер шрифта'}
				/>
				<Select 
					options={fontColors} 
					selected={articleColor} 
					title={'Цвет шрифта'} 
					onChange={(option) => {
						setArticleColor(option)
					}} 
				/>
				<Separator />
				<Select 
					options={backgroundColors} 
					selected={articleBackgroundColors} 
					title={'Цвет фона'} 
					onChange={(option) => {
						setArticleBackgroundColors(option)
					}} 
				/>
				<Select 
					options={contentWidthArr} 
					selected={articleContentWidth} 
					title={'Цвет фона'} 
					onChange={(option) => {
						setArticleContentWidth(option)
					}} 
				/>
			</ArticleParamsForm>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
