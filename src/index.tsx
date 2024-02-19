import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Сконвертировать состояние стилей в переменную стилей для DOM элемента
	function convertToStyles(newStyles: ArticleStateType) {
		return {
			'--font-family': newStyles.fontFamilyOption.value,
			'--font-size': newStyles.fontSizeOption.value,
			'--font-color': newStyles.fontColor.value,
			'--container-width': newStyles.contentWidth.value,
			'--bg-color': newStyles.backgroundColor.value,
		};
	}

	//! Состояние для определения открыта форма или нет.
	const [open, setOpen] = useState(false);
	const [state, setState] = useState(convertToStyles(defaultArticleState));

	// Обработчик клика на кнопку Открыть\Закрыть форму
	function toggleClick() {
		setOpen(!open);
	}

	// Применить новые стили
	function applyNewStyles(newStyles: ArticleStateType) {
		setState(convertToStyles(newStyles));
	}

	// Раз кликаем на статью пора закрывать попап
	function articleClicked() {
		setOpen(false);
	}

	return (
		<div className={clsx(styles.main)} style={state as CSSProperties}>
			<ArticleParamsForm
				open={open}
				applyNewStyles={applyNewStyles}
				toggleClick={toggleClick}
			/>
			<Article articleClicked={articleClicked} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
