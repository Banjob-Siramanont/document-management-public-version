export type EmployeeData = {
    selectedTitle: string | number;
    employeeFirstName: string;
    employeeLastName: string;
    employeeNickName: string;
    startWorkingdate: string;
    startPaySocialSecurityDate: string;
};

export type Payload<Key extends keyof EmployeeData> = {
    value: EmployeeData[Key];
    variableName: Key;
}