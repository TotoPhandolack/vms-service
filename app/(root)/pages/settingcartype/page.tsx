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
import { useCarTypeStore, CarType } from '@/app/store/car_type/carTypeStore';

const SettingCarType = () => {
    let emptyCarType: CarType = {
        ct_id: 0,
        car_type: ''
    };

    const [carTypeDialog, setCarTypeDialog] = useState(false);
    const [deleteCarTypeDialog, setDeleteCarTypeDialog] = useState(false);
    const [carType, setCarType] = useState<CarType>(emptyCarType);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    const { dataCarType, loading, getCarTypesData, addCarType, updateCarType, deleteCarType } = useCarTypeStore();

    useEffect(() => {
        getCarTypesData();
    }, []);

    const openNew = () => {
        setCarType(emptyCarType);
        setSubmitted(false);
        setCarTypeDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setCarTypeDialog(false);
    };

    const saveCarType = async () => {
        setSubmitted(true);

        if (carType.car_type.trim()) {
            try {
                if (carType.ct_id && carType.ct_id > 0) {
                    // แก้ไข
                    await updateCarType(carType);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'ສຳເລັດ',
                        detail: 'ແກ້ໄຂຂໍ້ມູນປະເພດລົດສຳເລັດ',
                        life: 3000
                    });
                } else {
                    // เพิ่มใหม่
                    await addCarType(carType);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'ສຳເລັດ',
                        detail: 'ເພີ່ມຂໍ້ມູນປະເພດລົດສຳເລັດ',
                        life: 3000
                    });
                }

                setCarTypeDialog(false);
                setCarType(emptyCarType);
                setSubmitted(false);
            } catch (error) {
                console.error('Save error:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'ເກີດຂໍ້ຜິດພາດ',
                    detail: carType.ct_id ? 'ບໍ່ສາມາດແກ້ໄຂຂໍ້ມູນໄດ້' : 'ບໍ່ສາມາດເພີ່ມຂໍ້ມູນໄດ້',
                    life: 3000
                });
            }
        }
    };

    const deleteCarTypeList = async () => {
        try {
            await deleteCarType(carType.ct_id);

            setDeleteCarTypeDialog(false);
            setCarType(emptyCarType);

            toast.current?.show({
                severity: 'success',
                summary: 'ສຳເລັດ',
                detail: 'ລົບຂໍ້ມູນປະເພດລົດສຳເລັດ',
                life: 3000
            });

            await getCarTypesData();
        } catch (error) {
            console.error('Delete error:', error);
            toast.current?.show({
                severity: 'error',
                summary: 'ເກີດຂໍ້ຜິດພາດ',
                detail: 'ບໍ່ສາມາດລົບຂໍ້ມູນໄດ້',
                life: 3000
            });
        }
    };

    const editCarType = (carType: CarType) => {
        setCarType({ ...carType });
        setCarTypeDialog(true);
    };

    const confirmDeleteCarType = (carType: CarType) => {
        setCarType(carType);
        setDeleteCarTypeDialog(true);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'car_type') => {
        const val = e.target.value || '';
        setCarType({ ...carType, [field]: val });
    };

    const codeBodyTemplate = (rowData: CarType) => {
        return (
            <>
                <span className="p-column-title">Code</span>
                {rowData.ct_id}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: CarType) => {
        return (
            <>
                <span className="p-column-title">Category</span>
                {rowData.car_type}
            </>
        );
    };

    const carTypeBodyTemplate = (rowData: CarType) => {
        return (
            <>
                <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editCarType(rowData)} />
                <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteCarType(rowData)} />
            </>
        );
    };

    const hideDeleteCarTypeDialog = () => {
        setDeleteCarTypeDialog(false);
    };

    const deleteCarTypeFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteCarTypeDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteCarTypeList} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* Centered Title */}
                    <div className="flex justify-content-center pb-4 mb-3 border-bottom-1 border-gray-200 ">
                        <h1 className="m-0 text-blue-800">ຂໍ້ມູນປະເພດລົດ</h1>
                    </div>

                    {/* Toolbar: Action Buttons (Left) + Search (Right) */}
                    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4">
                        <div className="flex gap-2">
                            <Button label="ເພີ່ມໃໝ່" icon="pi pi-plus" className='bg-blue-800 focus:bg-blue-900 border-none' onClick={openNew} />
                        </div>
                        <span className="block mt-2 md:mt-0 p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Search..." />
                        </span>
                    </div>

                    <DataTable
                        ref={dt}
                        value={dataCarType}
                        dataKey="ct_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} car types"
                        globalFilter={globalFilter}
                        emptyMessage="No car types found."
                        showGridlines
                        responsiveLayout="scroll"
                        loading={loading}
                    >
                        <Column field="ct_id" header="ລະຫັດ" sortable body={codeBodyTemplate} headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}></Column>
                        <Column field="car_type" header="ປະເພດລົດ" sortable body={categoryBodyTemplate} headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}></Column>
                        <Column body={carTypeBodyTemplate} header="ຈັດການ" headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}></Column>

                    </DataTable>

                    <Dialog
                        visible={carTypeDialog}
                        style={{ width: '450px' }}
                        header={carType.ct_id ? "ແກ້ໄຂຂໍ້ມູນປະເພດລົດ" : "ເພີ່ມຂໍ້ມູນປະເພດລົດ"}
                        modal
                        className="p-fluid"
                        footer={
                            <>
                                <Button label="ຍົກເລີກ" icon="pi pi-times" text onClick={hideDialog} />
                                <Button label="ບັນທຶກ" icon="pi pi-check" text onClick={saveCarType} />
                            </>
                        }
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="car_type" className="font-bold">
                                ຊື່ປະເພດລົດ <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="car_type"
                                value={carType.car_type}
                                onChange={(e) => onInputChange(e, 'car_type')}
                                required
                                autoFocus
                                placeholder='ກະລຸນາປ້ອນຊື່ປະເພດລົດ'
                                className={classNames({
                                    'p-invalid': submitted && !carType.car_type
                                })}
                            />
                            {submitted && !carType.car_type && (
                                <small className="p-invalid text-red-500">ຕ້ອງການຊື່ປະເພດລົດ.</small>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteCarTypeDialog} style={{ width: '450px' }} header="ການຢືນຢັນ" modal footer={deleteCarTypeFooter} onHide={hideDeleteCarTypeDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {carType && (
                                <span>
                                    ທ່ານຕ້ອງການທີ່ຈະລົບ <b>{carType.car_type}</b> ແທ້ບໍ?
                                </span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default SettingCarType;