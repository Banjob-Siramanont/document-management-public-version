export type GetTitleData = {
    _id: string;
    title_name: string;
    title_abbreviation: string;
    title_gender: string;
};

export type GetAllTitlesResponse = {
    status: 'OK' | 'NG';
    data: GetTitleData[];
    client_message: string;
};