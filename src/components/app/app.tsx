import { CSSProperties, useState, useRef } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';

export const App = () => {
	const mainRef = useRef<HTMLElement | null>(null);

	const [currentArticleState, setCurrentArticleState] =
		useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			ref={mainRef}
			style={
				{
					'--font-family': currentArticleState.fontFamilyOption.value,
					'--font-size': currentArticleState.fontSizeOption.value,
					'--font-color': currentArticleState.fontColor.value,
					'--container-width': currentArticleState.contentWidth.value,
					'--bg-color': currentArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setCurrentArticleState={setCurrentArticleState} />
			<Article />
		</main>
	);
};
