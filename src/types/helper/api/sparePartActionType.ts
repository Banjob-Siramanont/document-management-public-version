export type GetAllSparePartActionData = {
    _id: string;
    spare_part_action_name: string;
};

export type GetAllSparePartActionDatasResponse = {
    status: 'OK' | 'NG';
    data: GetAllSparePartActionData[];
    client_message: string;
};