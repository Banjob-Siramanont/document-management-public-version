export type TableHead = {
    tHeadTiltle: string;
    cssTextAlign: 'center' | 'end' | 'left' | 'right' | 'start';
    key?: string;
};

export type Data = Record<string, any>;

export type FormattedDataKey = { keyName: string | undefined };