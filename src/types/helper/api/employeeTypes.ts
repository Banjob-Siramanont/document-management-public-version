export type GetEmployeeData = {
    no: number;
    _id: string;
    title_id: string;
    title_name: string;
    title_abbreviation: string;
    job_position_id: string;
    job_position_name: string;
    employee_first_name: string;
    employee_last_name: string;
    employee_nick_name: string;
    employee_full_name: string;
    employee_start_working_date: string;
    employee_experience: string;
    employee_start_pay_social_security_date: string;
};

export type GetAllEmployeesResponse = {
    status: 'OK' | 'NG';
    data: GetEmployeeData[];
    client_message: string;
};

export type PostEmployeeData = {
    employee_title: string;
    employee_first_name: string;
    employee_last_name: string;
    employee_nick_name: string;
    employee_job_position: string;
    employee_start_working_date: string;
    employee_start_pay_social_security_date: string;
    employee_status: string;
    _id: string;
    employee_create_date: string;
    __v: number;
};

export type PostEmployeeResponse = {
    status: 'OK' | 'NG';
    data: PostEmployeeData;
    client_message: string;
};

export type GetEmployeeResponse = {
    status: 'OK' | 'NG';
    data: GetEmployeeData;
    client_message: string;
};