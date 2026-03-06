import React from 'react';
import useLanguage from '@/locale/useLanguage';
import HrModuleForm from '@/forms/HrModuleForm';
import CrudModule from '@/modules/CrudModule/CrudModule';

export default function HrModule() {
    const translate = useLanguage();
    const entity = 'hrmodule';

    const configPage = {
        entity,
        ...{
            DATATABLE_TITLE: translate('HR Module'),
            ADD_NEW_ENTITY: translate('Add Employee Record'),
            ENTITY_NAME: translate('Employee Record'),
            CREATE_ENTITY: translate('Create New Employee Record'),
            UPDATE_ENTITY: translate('Update Employee Record'),
        },
    };

    const dataTableColumns = [
        {
            title: translate('Employee Type'),
            dataIndex: 'employeeType',
        },
        {
            title: translate('Number of Employees'),
            dataIndex: 'numberOfEmployees',
        },
        {
            title: translate('Average Monthly Salary (INR)'),
            dataIndex: 'averageSalary',
            render: (val) => `₹${val ? val : 0}`,
        },
    ];

    const config = {
        ...configPage,
        readColumns: dataTableColumns,
        dataTableColumns,
        searchConfig: {
            displayLabels: ['employeeType'],
            searchFields: 'employeeType',
            outputValue: '_id',
        },
        entityDisplayLabels: ['employeeType'],
        deleteModalLabels: ['employeeType'],
    };

    return (
        <CrudModule
            createForm={<HrModuleForm />}
            updateForm={<HrModuleForm isUpdateForm={true} />}
            config={config}
            dataTableColumns={dataTableColumns}
        />
    );
}
