import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useState } from 'react';

import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

//! Наше дефолтное состояние стилей. оно стоит по умолчанию и его мы будет выставлять по кнопке сброс
const defaultState = {
	fontFamilyOption: defaultArticleState.fontFamilyOption,
	fontSizeOption: defaultArticleState.fontSizeOption,
	fontColor: defaultArticleState.fontColor,
	backgroundColor: defaultArticleState.backgroundColor,
	contentWidth: defaultArticleState.contentWidth,
};

type ArticleParamsFormProps = {
	//! Свойство открыто или закрыто окно
	open: boolean;
	//! Вызывается для применения новых стилей
	applyNewStyles: (newStyles: ArticleStateType) => void;
	//! Вызывается при клике на кнопку открыть форму.
	toggleClick: () => void;
};

export const ArticleParamsForm = ({
	open,
	applyNewStyles,
	toggleClick,
}: ArticleParamsFormProps) => {
	const [state, setState] = useState(defaultState);

	// Стили формы
	const articleStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: open,
	});

	//! Обработчик кнопки Сброс
	function handleReset() {
		setState(defaultState);
		applyNewStyles(defaultState);
	}

	//! Обработчик кнопки Применить
	function handleApply() {
		applyNewStyles(state);
	}

	// Убираем дефолтный submit формы
	function onSubmit(e: React.FormEvent) {
		e.preventDefault();
	}

	return (
		<>
			<ArrowButton handleClick={toggleClick} open={open}/>
			<aside className={articleStyle}>
				<form className={styles.form} onSubmit={onSubmit}>
					<Text as='h2' size={31} weight={800} align='left' family='open-sans'>
						Задайте параметры
					</Text>
					<Select
						options={fontFamilyOptions}
						selected={state.fontFamilyOption}
						onChange={(selected: OptionType) => {
							setState({ ...state, fontFamilyOption: selected });
						}}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						options={fontSizeOptions}
						selected={state.fontSizeOption}
						onChange={(selected: OptionType) => {
							setState({ ...state, fontSizeOption: selected });
						}}
						title='Размер шрифта'
					/>
					<Select
						options={fontColors}
						selected={state.fontColor}
						onChange={(selected: OptionType) => {
							setState({ ...state, fontColor: selected });
						}}
						title='Цвет шрифта'
					/>
					<Select
						options={backgroundColors}
						selected={state.backgroundColor}
						onChange={(selected: OptionType) => {
							setState({ ...state, backgroundColor: selected });
						}}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						selected={state.contentWidth}
						onChange={(selected: OptionType) => {
							setState({ ...state, contentWidth: selected });
						}}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' onClick={handleApply} />
					</div>
				</form>
			</aside>
		</>
	);
};
