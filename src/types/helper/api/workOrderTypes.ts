export type GetWorkOrderData = {
    no: number;
    _id: string;
    claim_no: string;
    employee_full_name: string;
    reparing_date: string;
    finish_reparing_date: string;
    vehicle_owner_type_name: string;
    vehicle_brand_eng_name: string;
    vehicle_model_eng_name: string;
    insurance_company_short_name: string;
    license_plate: string;
    after_repair_note: string;
};

export type GetAllWorkOrderResponse = {
    status: 'OK' | 'NG';
    data: GetWorkOrderData[];
    client_message: string;
};

export type GetWorkOrderResponse = {
    status: 'OK' | 'NG';
    data: GetWorkOrderData;
    client_message: string;
};

export type SparePartData = {
    no: number;
    spare_part_name: string;
    is_inspect: string;
    is_replace: string;
    is_polish: string;
    is_paint: string;
    is_photoshop: string;
    is_photo: string;
    note: string;
}
export type GetWorkOrderForPreviewAndPrintData = {
    _id: string;
    vehicle_owner_type_name: string;
    vehicle_brand_eng_name: string;
    vehicle_model_eng_name: string;
    vehicle_color_name: string;
    insurance_company_short_name: string;
    ex_save: number
    license_plate: string;
    vehicle_owner_work_place: string;
    employee_full_name: string;
    parking_date: string;
    temporary_taking_vehicle_back_date: string;
    driving_date: string;
    taking_date: string;
    vehicle_owner_tel: string;
    reparing_buget: string;
    reparing_date: string;
    finish_reparing_date: string;
    key_note: string;
    spare_part_datas: SparePartData[];
};

export type GetWorkOrderForPreviewAndPrintResponse = {
    status: 'OK' | 'NG';
    data: GetWorkOrderForPreviewAndPrintData;
    client_message: string;
};

export type SparePartDataForEdit = {
    id: number;
    spare_part_id: string;
    spare_part_actions: string[];
    note: string;
    _id: string;
}
export type GetWorkOrderForEditData = {
    _id: string;
    vehicle_owner_type_id: string;
    claim_history_id: string;
    vehicle_owner_work_place: string;
    key_note: string;
    after_repair_note: string;
    employee_id: string;
    parking_date: string;
    temporary_taking_vehicle_back_date: string;
    driving_date: string;
    taking_date: string;
    reparing_date: string;
    finish_reparing_date: string;
    vehicle_owner_tel: string;
    reparing_buget: number;
    spare_part_datas: SparePartDataForEdit[];
};

export type GetWorkOrderForEditResponse = {
    status: 'OK' | 'NG';
    data: GetWorkOrderForEditData;
    client_message: string;
};