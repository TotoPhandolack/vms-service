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

/* Department Management Page - Connected to departments.json */
const DepartmentPage = () => {
    let emptyDepartment: Demo.Product = {
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

    const [departments, setDepartments] = useState<Demo.Product[]>([]);
    const [departmentDialog, setDepartmentDialog] = useState(false);
    const [deleteDepartmentDialog, setDeleteDepartmentDialog] = useState(false);
    const [deleteDepartmentsDialog, setDeleteDepartmentsDialog] = useState(false);
    const [department, setDepartment] = useState<Demo.Product>(emptyDepartment);
    const [selectedDepartments, setSelectedDepartments] = useState<Demo.Product[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    // Load departments data on component mount
    useEffect(() => {
        fetch('/demo/data/departments.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => setDepartments(d.data as Demo.Product[]))
            .catch((err) => console.error('Error loading departments:', err));
    }, []);

    const openNew = () => {
        setDepartment(emptyDepartment);
        setSubmitted(false);
        setDepartmentDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setDepartmentDialog(false);
    };

    const hideDeleteDepartmentDialog = () => {
        setDeleteDepartmentDialog(false);
    };

    const hideDeleteDepartmentsDialog = () => {
        setDeleteDepartmentsDialog(false);
    };

    const saveDepartment = () => {
        setSubmitted(true);

        if (department.name.trim()) {
            let _departments = [...departments];
            let _department = { ...department };
            
            if (department.id) {
                // Update existing department
                const index = findIndexById(department.id);
                _departments[index] = _department;
                // Update category to match name
                _departments[index].category = _department.name;
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ອັບເດດຂໍ້ມູນຝ່າຍສຳເລັດ',
                    life: 3000
                });
            } else {
                // Create new department
                _department.id = createId();
                _department.code = `DEPT${String(_departments.length + 1).padStart(3, '0')}`;
                _department.category = _department.name; // Set category same as name
                _department.image = 'product-placeholder.svg';
                _departments.push(_department);
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ເພີ່ມຂໍ້ມູນຝ່າຍສຳເລັດ',
                    life: 3000
                });
            }

            setDepartments(_departments);
            setDepartmentDialog(false);
            setDepartment(emptyDepartment);
        }
    };

    const editDepartment = (department: Demo.Product) => {
        setDepartment({ ...department });
        setDepartmentDialog(true);
    };

    const confirmDeleteDepartment = (department: Demo.Product) => {
        setDepartment(department);
        setDeleteDepartmentDialog(true);
    };

    const deleteDepartment = () => {
        let _departments = departments.filter((val) => val.id !== department.id);
        setDepartments(_departments);
        setDeleteDepartmentDialog(false);
        setDepartment(emptyDepartment);
        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ລົບຂໍ້ມູນຝ່າຍສຳເລັດ',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < departments.length; i++) {
            if (departments[i].id === id) {
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

    const deleteSelectedDepartments = () => {
        let _departments = departments.filter((val) => !selectedDepartments?.includes(val));
        setDepartments(_departments);
        setDeleteDepartmentsDialog(false);
        setSelectedDepartments(null);
        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ລົບຂໍ້ມູນຝ່າຍທີ່ເລືອກສຳເລັດ',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _department = { ...department };
        _department[`${name}`] = val;
        setDepartment(_department);
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

    const departmentBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">ຝ່າຍ</span>
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
                    onClick={() => editDepartment(rowData)} 
                    tooltip="ແກ້ໄຂ"
                    tooltipOptions={{ position: 'top' }}
                />
                <Button 
                    icon="pi pi-trash" 
                    rounded 
                    severity="warning" 
                    onClick={() => confirmDeleteDepartment(rowData)} 
                    tooltip="ລົບ"
                    tooltipOptions={{ position: 'top' }}
                />
            </>
        );
    };

    // Dialog footers
    const departmentDialogFooter = (
        <>
            <Button label="ຍົກເລີກ" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="ບັນທຶກ" icon="pi pi-check" text onClick={saveDepartment} />
        </>
    );

    const deleteDepartmentDialogFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteDepartmentDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteDepartment} />
        </>
    );

    const deleteDepartmentsDialogFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteDepartmentsDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteSelectedDepartments} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* Title */}
                    <div className="flex justify-content-center pb-4 mb-3 border-bottom-1 border-gray-200">
                        <h1 className="m-0 text-blue-800">ຂໍ້ມູນພາກສ່ວນນຳໃຊ້ (ຝ່າຍ)</h1>
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
                        value={departments}
                        selection={selectedDepartments}
                        onSelectionChange={(e) => setSelectedDepartments(e.value as Demo.Product[])}
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
                            header="ຊື່ຝ່າຍ" 
                            sortable 
                            body={departmentBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column 
                            body={actionBodyTemplate} 
                            header="ຈັດການ" 
                            headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}
                        ></Column>
                    </DataTable>

                    {/* Create/Edit Dialog */}
                    <Dialog 
                        visible={departmentDialog} 
                        style={{ width: '450px' }} 
                        header="ລາຍລະອຽດຝ່າຍ" 
                        modal 
                        className="p-fluid" 
                        footer={departmentDialogFooter} 
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                ຊື່ຝ່າຍ <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={department.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                placeholder="ກະລຸນາປ້ອນຊື່ຝ່າຍ (ເຊັ່ນ: ຝ່າຍບໍລິຫານ)"
                                className={classNames({
                                    'p-invalid': submitted && !department.name
                                })}
                            />
                            {submitted && !department.name && (
                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຊື່ຝ່າຍ</small>
                            )}
                        </div>

                        
                    </Dialog>

                    {/* Delete Single Dialog */}
                    <Dialog 
                        visible={deleteDepartmentDialog} 
                        style={{ width: '450px' }} 
                        header="ການຢືນຢັນ" 
                        modal 
                        footer={deleteDepartmentDialogFooter} 
                        onHide={hideDeleteDepartmentDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {department && (
                                <span>
                                    ທ່ານຕ້ອງການລົບ <b>{department.name}</b> ແທ້ບໍ?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    {/* Delete Multiple Dialog */}
                    <Dialog 
                        visible={deleteDepartmentsDialog} 
                        style={{ width: '450px' }} 
                        header="ການຢືນຢັນ" 
                        modal 
                        footer={deleteDepartmentsDialogFooter} 
                        onHide={hideDeleteDepartmentsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {department && (
                                <span>ທ່ານຕ້ອງການລົບລາຍການທີ່ເລືອກທັງໝົດແທ້ບໍ?</span>
                            )}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default DepartmentPage;