/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Demo } from '@/types';

/* Car Brand Management Page - Connected to brands.json */
const SettingRentType = () => {
    let emptyBrand: Demo.Product = {
        id: '',
        name: '',
        image: '',
        description: '',
        category: '',
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [brands, setBrands] = useState<Demo.Product[]>([]);
    const [brandDialog, setBrandDialog] = useState(false);
    const [deleteBrandDialog, setDeleteBrandDialog] = useState(false);
    const [deleteBrandsDialog, setDeleteBrandsDialog] = useState(false);
    const [brand, setBrand] = useState<Demo.Product>(emptyBrand);
    const [selectedBrands, setSelectedBrands] = useState<Demo.Product[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    // Load brands data on component mount
    useEffect(() => {
        fetch('/demo/data/brands.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => setBrands(d.data as Demo.Product[]))
            .catch((err) => console.error('Error loading brands:', err));
    }, []);

    const openNew = () => {
        setBrand(emptyBrand);
        setSubmitted(false);
        setBrandDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setBrandDialog(false);
    };

    const hideDeleteBrandDialog = () => {
        setDeleteBrandDialog(false);
    };

    const hideDeleteBrandsDialog = () => {
        setDeleteBrandsDialog(false);
    };

    const saveBrand = () => {
        setSubmitted(true);

        if (brand.name.trim()) {
            let _brands = [...brands];
            let _brand = { ...brand };

            if (brand.id) {
                // Update existing brand
                const index = findIndexById(brand.id);
                _brands[index] = _brand;
                // Update category to match name
                _brands[index].category = _brand.name;
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ອັບເດດຂໍ້ມູນປະເພດການເຊົ່າສຳເລັດ',
                    life: 3000
                });
            } else {
                // Create new brand
                _brand.id = createId();
                _brand.code = `BRD${String(_brands.length + 1).padStart(3, '0')}`;
                _brand.category = _brand.name; // Set category same as name
                _brand.image = 'product-placeholder.svg';
                _brands.push(_brand);
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ເພີ່ມຂໍ້ມູນປະເພດການເຊົ່າສຳເລັດ',
                    life: 3000
                });
            }

            setBrands(_brands);
            setBrandDialog(false);
            setBrand(emptyBrand);
        }
    };

    const editBrand = (brand: Demo.Product) => {
        setBrand({ ...brand });
        setBrandDialog(true);
    };

    const confirmDeleteBrand = (brand: Demo.Product) => {
        setBrand(brand);
        setDeleteBrandDialog(true);
    };

    const deleteBrand = () => {
        let _brands = brands.filter((val) => val.id !== brand.id);
        setBrands(_brands);
        setDeleteBrandDialog(false);
        setBrand(emptyBrand);
        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ລົບຂໍ້ມູນປະເພດການເຊົ່າສຳເລັດ',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < brands.length; i++) {
            if (brands[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };

    const deleteSelectedBrands = () => {
        let _brands = brands.filter((val) => !selectedBrands?.includes(val));
        setBrands(_brands);
        setDeleteBrandsDialog(false);
        setSelectedBrands(null);
        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ລົບຂໍ້ມູນປະເພດການເຊົ່າທີ່ເລືອກສຳເລັດ',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _brand = { ...brand };
        _brand[`${name}`] = val;
        setBrand(_brand);
    };

    // Template functions
    const codeBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">ລະຫັດ</span>
                {rowData.code}
            </>
        );
    };

    const brandBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">ການເຊົ່າ</span>
                {rowData.name}
            </>
        );
    };

    const actionBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <Button
                    icon="pi pi-pencil"
                    rounded
                    severity="success"
                    className="mr-2"
                    onClick={() => editBrand(rowData)}
                    tooltip="ແກ້ໄຂ"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button
                    icon="pi pi-trash"
                    rounded
                    severity="warning"
                    onClick={() => confirmDeleteBrand(rowData)}
                    tooltip="ລົບ"
                    tooltipOptions={{ position: 'top' }}
                />
            </>
        );
    };

    // Dialog footers
    const brandDialogFooter = (
        <>
            <Button label="ຍົກເລີກ" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="ບັນທຶກ" icon="pi pi-check" text onClick={saveBrand} />
        </>
    );

    const deleteBrandDialogFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteBrandDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteBrand} />
        </>
    );

    const deleteBrandsDialogFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteBrandsDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteSelectedBrands} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* Title */}
                    <div className="flex justify-content-center pb-4 mb-3 border-bottom-1 border-gray-200">
                        <h1 className="m-0 text-blue-800">ຂໍ້ມູນປະເພດການເຊົ່າ</h1>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4">
                        <div className="flex gap-2">
                            <Button label="ເພີ່ມໃໝ່" icon="pi pi-plus" className='bg-blue-800 focus:bg-blue-900 border-none' onClick={openNew} />
                        </div>
                        <span className="block mt-2 md:mt-0 p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText
                                type="search"
                                onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                                placeholder="ຄົ້ນຫາ..."
                            />
                        </span>
                    </div>

                    {/* DataTable */}
                    <DataTable
                        ref={dt}
                        value={brands}
                        selection={selectedBrands}
                        onSelectionChange={(e) => setSelectedBrands(e.value as Demo.Product[])}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="ສະແດງ {first} ຫາ {last} ຈາກ {totalRecords} ລາຍການ"
                        globalFilter={globalFilter}
                        emptyMessage="ບໍ່ພົບຂໍ້ມູນ"
                        showGridlines
                        responsiveLayout="scroll"
                    >
                        <Column
                            field="code"
                            header="ລະຫັດ"
                            sortable
                            body={codeBodyTemplate}
                            headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column
                            field="name"
                            header="ການເຊົ່າ"
                            sortable
                            body={brandBodyTemplate}
                            headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column
                            body={actionBodyTemplate}
                            header="ຈັດການ"
                            headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}
                        ></Column>
                    </DataTable>

                    {/* Create/Edit Dialog */}
                    <Dialog
                        visible={brandDialog}
                        style={{ width: '450px' }}
                        header="ລາຍລະອຽດຂໍ້ມູນປະເພດການເຊົ່າ"
                        modal
                        className="p-fluid"
                        footer={brandDialogFooter}
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                ຊື່ການເຊົ່າ <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={brand.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                placeholder="ກະລຸນາປ້ອນຊື່ການເຊົ່າ (ເຊັ່ນ: Toyota, Honda)"
                                className={classNames({
                                    'p-invalid': submitted && !brand.name
                                })}
                            />
                            {submitted && !brand.name && (
                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຊື່ການເຊົ່າ</small>
                            )}
                        </div>

                    </Dialog>

                    {/* Delete Single Dialog */}
                    <Dialog
                        visible={deleteBrandDialog}
                        style={{ width: '450px' }}
                        header="ການຢືນຢັນ"
                        modal
                        footer={deleteBrandDialogFooter}
                        onHide={hideDeleteBrandDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {brand && (
                                <span>
                                    ທ່ານຕ້ອງການລົບ <b>{brand.name}</b> ແທ້ບໍ?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    {/* Delete Multiple Dialog */}
                    <Dialog
                        visible={deleteBrandsDialog}
                        style={{ width: '450px' }}
                        header="ການຢືນຢັນ"
                        modal
                        footer={deleteBrandsDialogFooter}
                        onHide={hideDeleteBrandsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {brand && (
                                <span>ທ່ານຕ້ອງການລົບລາຍການທີ່ເລືອກທັງໝົດແທ້ບໍ?</span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default SettingRentType;