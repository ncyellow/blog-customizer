import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	open?: boolean;
	handleClick?: OnClick;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	// Стили кнопки
	const arrowStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: props.open,
	});

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			onClick={props?.handleClick}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={arrowStyle}>
			<img src={arrow} alt='иконка стрелочки' className={styles.arrow} />
		</div>
	);
};
