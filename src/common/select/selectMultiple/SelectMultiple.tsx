import { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

// Helper
import { filteredData } from '../../../helper/utils/filter';

// Type
import { Option } from '../../../types/store/reducer/commonTypes';

// css
import styles from './SelectMultiple.module.css';

type SelectMultipleProps = {
    label?: string;
    options: Option[];
    keyValue: string;
    keyDisplayValue: string;
    values: string[];
    onChange: (value: string[]) => void;
};

export default function SelectMultiple({ label, options, keyValue, keyDisplayValue, values = [], onChange }: SelectMultipleProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLUListElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);
    const [dropdownTop, setDropdownTop] = useState<number | null>(0);

    const clearOptions = () => onChange([]);

    const isOptionSelected = (option: Option) => {
        return values?.some(value => value === option[keyValue])
    };

    const selectOption = (selectedValue: string) => {
        if (values?.some(value => value === selectedValue)) {
            onChange(values.filter(value => value !== selectedValue))
        }
        else onChange([...values, selectedValue]);
    };

    const calculatePosition = () => {
        if (!buttonRef.current || !containerRef.current) return;

        const spaceRemaining = window.innerHeight - buttonRef.current.getBoundingClientRect().bottom;
        const contentHeight = containerRef.current.clientHeight;
        const topPosition = spaceRemaining > contentHeight ? null : spaceRemaining - contentHeight;

        setDropdownTop(topPosition);
    };

    useEffect(() => {
        if (isOpen) {
            calculatePosition();
            setHighlightedIndex(0);
        }
    }, [isOpen]);

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.target !== containerRef.current) return
            switch (event.code) {
                case 'Enter':
                case 'Space':
                    setIsOpen(previous => !previous);
                    if (isOpen) selectOption(options[highlightedIndex][keyValue]);
                    break;

                case 'ArrowUp':
                case 'ArrowDown': {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue = highlightedIndex + (event.code === 'ArrowDown' ? 1 : -1);
                    if (newValue >= 0 && newValue < options?.length) setHighlightedIndex(newValue)
                    break;
                }
                case 'Escape': setIsOpen(false); break;
            }
        };

        // containerRef.current?.addEventListener('keydown', handler);

        // return () => {
        //     containerRef.current?.removeEventListener('keydown', handler)
        // }
        document.addEventListener('keydown', handler);

        return () => {
            document.removeEventListener('keydown', handler);
        };

    }, [isOpen, highlightedIndex, options]);

    const handleOnBlur = () => {
        setTimeout(() => setIsOpen(false), 150);
    };

    return (
        <>
            <div className='flex flex-col border border-inputColor rounded-[6px] px-4 py-2'>
                <div className='text-inputText dark:text-inputTextDark text-sm font-light'>{label}</div>
                <div
                    ref={buttonRef}
                    onBlur={() => handleOnBlur()}
                    tabIndex={0}
                    onClick={() => setIsOpen(previous => !previous)}
                    className={styles.container}
                >
                    <span className={styles.value}>
                        {values?.map(value => (
                            <button
                                className={`${styles['option-badge']} dark:text-smoothWhite font-light`}
                                key={value}
                                onClick={event => {
                                    event.stopPropagation()
                                    selectOption(value)
                                }}
                            >
                                {filteredData(options, value, keyValue, keyDisplayValue)}
                                <span className={styles['remove-btn']}>&times;</span>
                            </button>
                        ))}
                    </span>
                    <button
                        onClick={event => {
                            event.stopPropagation()
                            clearOptions()
                        }}
                        className={styles['clear-btn']}
                    >
                        &times;
                    </button>
                    <div className={styles.divider}></div>
                    <div><FiChevronDown className={`text-xl ${isOpen ? 'transform rotate-180' : ''} dark:text-smoothWhite transition-all duration-300`} /></div>
                    <ul
                        ref={containerRef}
                        className={`${styles.options} ${isOpen ? styles.show : ''}`}
                        style={{ top: dropdownTop ? `${dropdownTop}px` : '' }}
                    >
                        {options?.map((option, index) => (
                            <li
                                onClick={event => {
                                    event.stopPropagation()
                                    selectOption(option[keyValue])
                                    setIsOpen(false)
                                }}
                                onMouseEnter={() => setHighlightedIndex(index)}
                                key={option[keyValue]}
                                className={`${styles.option} ${isOptionSelected(option) ? styles.selected : ''} ${index === highlightedIndex ? styles.highlighted : ''} bg-white dark:bg-intenseFadeBlack dark:text-smoothWhite`}
                            >
                                {option[keyDisplayValue]}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
