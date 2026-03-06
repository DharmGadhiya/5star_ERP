import React from 'react';
import useLanguage from '@/locale/useLanguage';
import CrudModule from '@/modules/CrudModule/CrudModule';
import ProductForm from '@/forms/ProductForm';

export default function ProductMaster() {
    const translate = useLanguage();
    const entity = 'product';
    const searchConfig = {
        displayLabels: ['name'],
        searchFields: 'name',
        outputValue: '_id',
    };

    const deleteModalLabels = ['name'];

    const readColumns = [
        {
            title: translate('Name') || 'Name',
            dataIndex: 'name',
        },
        {
            title: translate('Price') || 'Price',
            dataIndex: 'price',
        },
        {
            title: translate('Duration (in days)') || 'Duration (in days)',
            dataIndex: 'duration',
        },
        {
            title: translate('Steel') || 'Steel',
            dataIndex: 'materials.steel',
        },
        {
            title: translate('Alloy') || 'Alloy',
            dataIndex: 'materials.alloy',
        },
        {
            title: translate('Rubber') || 'Rubber',
            dataIndex: 'materials.rubber',
        },
        {
            title: translate('Glass') || 'Glass',
            dataIndex: 'materials.glass',
        },
        {
            title: translate('Fibre') || 'Fibre',
            dataIndex: 'materials.fibre',
        },
        {
            title: translate('Assembly Kits') || 'Assembly Kits',
            dataIndex: 'materials.assemblyKits',
        },
        {
            title: translate('Fluid Kits') || 'Fluid Kits',
            dataIndex: 'materials.fluidKits',
        },
        {
            title: translate('Paint') || 'Paint',
            dataIndex: 'materials.paint',
        },
    ];

    const dataTableColumns = [
        {
            title: translate('Name') || 'Name',
            dataIndex: 'name',
        },
        {
            title: translate('Price') || 'Price',
            dataIndex: 'price',
        },
        {
            title: translate('Duration (in days)') || 'Duration (in days)',
            dataIndex: 'duration',
        },
    ];

    const Labels = {
        PANEL_TITLE: translate('product_master') || 'Product Master',
        DATATABLE_TITLE: translate('products_list') || 'Products List',
        ADD_NEW_ENTITY: translate('add_new_product') || 'Add New Product',
        ENTITY_NAME: translate('product_master') || 'Product Master',
    };

    const configPage = {
        entity,
        ...Labels,
    };

    const config = {
        ...configPage,
        readColumns,
        dataTableColumns,
        searchConfig,
        deleteModalLabels,
    };

    return (
        <CrudModule
            createForm={<ProductForm />}
            updateForm={<ProductForm isUpdateForm={true} />}
            config={config}
        />
    );
}
