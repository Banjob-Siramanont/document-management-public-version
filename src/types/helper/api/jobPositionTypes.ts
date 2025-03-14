export type GetJobPositionData = {
    no: number;
    _id: string;
    job_position_name: string;
};

export type GetAllJobPositionsResponse = {
    status: 'OK' | 'NG';
    data: GetJobPositionData[];
    client_message: string;
};

export type PostJobPositionData = {
    job_position_name: string;
    job_position_status: string;
    _id: string;
    job_position_create_date: string;
    __v: number;
};

export type PostJobPositionResponse = {
    status: 'OK' | 'NG';
    data: PostJobPositionData;
    client_message: string;
};

export type GetJobPositionResponse = {
    status: 'OK' | 'NG';
    data: GetJobPositionData;
    client_message: string;
};