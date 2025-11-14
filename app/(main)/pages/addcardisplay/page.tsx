/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Demo } from '@/types';
import Link from 'next/link';

// Extended interface เพื่อรองรับข้อมูลจาก 2 แหล่ง
interface CombinedData extends Demo.Product {
    departmentName?: string;  // สำหรับแสดงในคอลัมน์ "ພະແນກ"
    generationName?: string;  // สำหรับแสดงในคอลัมน์ "ຝ່າຍ"
}

/* Updated component for Car Generation Management */
const CarGenerationPage = () => {
    let emptyGeneration: Demo.Product = {
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

    const [generations, setGenerations] = useState<Demo.Product[]>([]);
    const [departments, setDepartments] = useState<Demo.Product[]>([]);
    const [combinedData, setCombinedData] = useState<CombinedData[]>([]);
    const [generationDialog, setGenerationDialog] = useState(false);
    const [printDialog, setPrintDialog] = useState(false);
    const [print, setPrint] = useState<Demo.Product>(emptyGeneration);
    const [deleteGenerationDialog, setDeleteGenerationDialog] = useState(false);
    const [deleteGenerationsDialog, setDeleteGenerationsDialog] = useState(false);
    const [changePasswordDialog, setChangePasswordDialog] = useState(false);
    const [generation, setGeneration] = useState<Demo.Product>(emptyGeneration);
    const [selectedGenerations, setSelectedGenerations] = useState<CombinedData[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    // Load data on component mount
    useEffect(() => {
        // Load generations data
        fetch('/demo/data/generations.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => setGenerations(d.data as Demo.Product[]))
            .catch((err) => console.error('Error loading generations:', err));

        // Load departments data
        fetch('/demo/data/departments.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => setDepartments(d.data as Demo.Product[]))
            .catch((err) => console.error('Error loading departments:', err));
    }, []);

    // Combine data whenever departments or generations change
    useEffect(() => {
        if (departments.length > 0 || generations.length > 0) {
            const combined: CombinedData[] = [
                // Map departments -> แสดงใน column "ພະແນກ"
                ...departments.map(dept => ({
                    ...dept,
                    departmentName: dept.name,  // ชื่อแผนก
                    generationName: undefined   // ไม่มีข้อมูล generation
                })),
                // Map generations -> แสดงใน column "ຝ່າຍ"  
                ...generations.map(gen => ({
                    ...gen,
                    departmentName: undefined,  // ไม่มีข้อมูล department
                    generationName: gen.name    // ชื่อรุ่นรถ
                }))
            ];
            setCombinedData(combined);
        }
    }, [departments, generations]);

    const openNew = () => {
        setGeneration(emptyGeneration);
        setSubmitted(false);
        setGenerationDialog(true);
    };

    const printNew = () => {
        setPrint(emptyGeneration);
        setSubmitted(false);
        setPrintDialog(true);
    }

 
    const hideDialog = () => {
        setSubmitted(false);
        setGenerationDialog(false);
    };

    const hidePrintDialog = () => {
        setPrintDialog(false);
    };

    const hideDeleteGenerationDialog = () => {
        setDeleteGenerationDialog(false);
    };

    const hideDeleteGenerationsDialog = () => {
        setDeleteGenerationsDialog(false);
    };

    const openChangePasswordDialog = (generation: Demo.Product) => {
        setGeneration(generation);
        setNewPassword('');
        setConfirmPassword('');
        setSubmitted(false);
        setChangePasswordDialog(true);
    };

    const hideChangePasswordDialog = () => {
        setChangePasswordDialog(false);
        setNewPassword('');
        setConfirmPassword('');
        setSubmitted(false);
    };

    const handlePrint = () => {
        window.print();
        hidePrintDialog();
    };

    const saveChangePassword = () => {
        setSubmitted(true);

        if (newPassword.trim() && confirmPassword.trim()) {
            if (newPassword === confirmPassword) {
                // Here you would normally make an API call to change the password
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ປ່ຽນລະຫັດຜ່ານສຳເລັດ',
                    life: 3000
                });
                hideChangePasswordDialog();
            } else {
                toast.current?.show({
                    severity: 'error',
                    summary: 'ຜິດພາດ',
                    detail: 'ລະຫັດຜ່ານບໍ່ກົງກັນ',
                    life: 3000
                });
            }
        }
    };

    const saveGeneration = () => {
        setSubmitted(true);

        if (generation.name.trim() && generation.category) {
            let _generations = [...generations];
            let _generation = { ...generation };
            
            if (generation.id) {
                // Update existing generation
                const index = findIndexById(generation.id);
                _generations[index] = _generation;
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ອັບເດດຂໍ້ມູນພະແນກ/ສາຂາສຳເລັດ',
                    life: 3000
                });
            } else {
                // Create new generation
                _generation.id = createId();
                _generation.code = `GEN${String(_generations.length + 1).padStart(3, '0')}`;
                _generation.image = 'product-placeholder.svg';
                _generations.push(_generation);
                toast.current?.show({
                    severity: 'success',
                    summary: 'ສຳເລັດ',
                    detail: 'ເພີ່ມຂໍ້ມູນພະແນກ/ສາຂາສຳເລັດ',
                    life: 3000
                });
            }

            setGenerations(_generations);
            setGenerationDialog(false);
            setGeneration(emptyGeneration);
        }
    };

    const editGeneration = (generation: Demo.Product) => {
        setGeneration({ ...generation });
        setGenerationDialog(true);
    };

    const confirmDeleteGeneration = (generation: Demo.Product) => {
        setGeneration(generation);
        setDeleteGenerationDialog(true);
    };

    const deleteGeneration = () => {
        let _generations = generations.filter((val) => val.id !== generation.id);
        setGenerations(_generations);
        setDeleteGenerationDialog(false);
        setGeneration(emptyGeneration);
        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ລົບຂໍ້ມູນພະແນກ/ສາຂາສຳເລັດ',
            life: 3000
        });
    };

    const findIndexById = (id: string) => {
        let index = -1;
        for (let i = 0; i < generations.length; i++) {
            if (generations[i].id === id) {
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

    const confirmDeleteSelected = () => {
        setDeleteGenerationsDialog(true);
    };

    const deleteSelectedGenerations = () => {
        let _generations = generations.filter((val) => !selectedGenerations?.includes(val));
        setGenerations(_generations);
        setDeleteGenerationsDialog(false);
        setSelectedGenerations(null);
        toast.current?.show({
            severity: 'success',
            summary: 'ສຳເລັດ',
            detail: 'ລົບຂໍ້ມູນພະແນກ/ສາຂາທີ່ເລືອກສຳເລັດ',
            life: 3000
        });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        let _generation = { ...generation };
        _generation[`${name}`] = val;
        setGeneration(_generation);
    };

    const onCategoryChange = (e: { value: any }) => {
        let _generation = { ...generation };
        _generation.category = e.value;
        setGeneration(_generation);
    };

    // Template functions
    const codeBodyTemplate = (rowData: CombinedData) => {
        return (
            <>
                <span className="p-column-title">ລະຫັດ</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData: CombinedData) => {
        return (
            <>
                <span className="p-column-title">ຊື່</span>
                {rowData.name}
            </>
        );
    };

    const departmentBodyTemplate = (rowData: CombinedData) => {
        return (
            <>
                <span className="p-column-title">ພະແນກ</span>
                {rowData.departmentName || '-'}
            </>
        );
    };

    const generationBodyTemplate = (rowData: CombinedData) => {
        return (
            <>
                <span className="p-column-title">ຝ່າຍ</span>
                {rowData.generationName || '-'}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: CombinedData) => {
        return (
            <>
                <span className="p-column-title">ປະເພດ</span>
                {rowData.category}
            </>
        );
    };

    const actionBodyTemplate = (rowData: CombinedData) => {
        return (
            <>

                <Button 
                    icon="pi pi-eye" 
                    rounded 
                    severity="warning" 
                    className="mr-2" 
                    onClick={() => openChangePasswordDialog(rowData)}
                    tooltip="ປ່ຽນລະຫັດຜ່ານ"
                    tooltipOptions={{ position: 'top' }}
                />

                <Button 
                    icon="pi pi-pencil" 
                    rounded 
                    severity="success" 
                    className="mr-2" 
                    onClick={() => editGeneration(rowData)} 
                />
                
            </>
        );
    };

    const generationDialogFooter = (
        <>
            <Button 
                label="ຍົກເລີກ" 
                icon="pi pi-times" 
                text 
                onClick={hideDialog} 
            />
            <Button 
                label="ບັນທຶກ" 
                icon="pi pi-check" 
                onClick={saveGeneration} 
            />
        </>
    );

    const deleteGenerationDialogFooter = (
        <>
            <Button 
                label="ບໍ່" 
                icon="pi pi-times" 
                text 
                onClick={hideDeleteGenerationDialog} 
            />
            <Button 
                label="ແມ່ນ" 
                icon="pi pi-check" 
                severity="danger" 
                onClick={deleteGeneration} 
            />
        </>
    );

    const deleteGenerationsDialogFooter = (
        <>
            <Button 
                label="ບໍ່" 
                icon="pi pi-times" 
                text 
                onClick={hideDeleteGenerationsDialog} 
            />
            <Button 
                label="ແມ່ນ" 
                icon="pi pi-check" 
                severity="danger" 
                onClick={deleteSelectedGenerations} 
            />
        </>
    );

    const changePasswordDialogFooter = (
        <>
            <Button 
                label="ຍົກເລີກ" 
                icon="pi pi-times" 
                text 
                onClick={hideChangePasswordDialog} 
            />
            <Button 
                label="ບັນທຶກ" 
                icon="pi pi-check" 
                onClick={saveChangePassword} 
            />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* Title */}
                    <div className="flex justify-content-center pb-4 mb-3 border-bottom-1 border-gray-200">
                        <h1 className="m-0 text-blue-800">ຂໍ້ມູນລົດ</h1>
                    </div>

                    {/* Toolbar */}
                    <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mb-4">
                        <div className="flex gap-2">
                            <Link href='/pages/addcar/'>
                            <Button 
                                label="ເພີ່ມໃໝ່" 
                                icon="pi pi-plus" 
                                severity="success" 
                            />
                            </Link>
                            
                            <Button 
                                label="ລົບ" 
                                icon="pi pi-trash" 
                                severity="danger" 
                                onClick={confirmDeleteSelected} 
                                disabled={!selectedGenerations || !selectedGenerations.length} 
                            />
                        </div>

                        <div className="flex gap-2">

                        <span className="block mt-2 md:mt-0 p-input-icon-left">
                            <i className="pi pi-search" />
                            <InputText 
                                type="search" 
                                onInput={(e) => setGlobalFilter(e.currentTarget.value)} 
                                placeholder="ຄົ້ນຫາ..." 
                            />
                        </span>

                            <Button 
                                label="ພິມລາຍງານ" 
                                icon="pi pi-print" 
                                severity="info" 
                                onClick={printNew} 
                            />
                            <Button 
                                label="Export" 
                                icon="pi pi-file-export" 
                                severity="secondary" 
                                onClick={confirmDeleteSelected} 
                                disabled={!selectedGenerations || !selectedGenerations.length} 
                            />
                        </div>
                    </div>

                


                    {/* DataTable - แสดงข้อมูลรวมจาก departments และ generations */}
                    <DataTable
                        ref={dt}
                        value={combinedData}
                        selection={selectedGenerations}
                        onSelectionChange={(e) => setSelectedGenerations(e.value as CombinedData[])}
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
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column 
                            field="code" 
                            header="ລະຫັດ" 
                            sortable 
                            body={codeBodyTemplate} 
                            headerStyle={{ minWidth: '10rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column 
                            field="name" 
                            header="ປ້າຍທະບຽນ" 
                            sortable 
                            body={nameBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        {/* Column สำหรับแสดง departments */}
                        <Column 
                            field="departmentName" 
                            header="ປະເພດ" 
                            sortable 
                            body={departmentBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        {/* Column สำหรับแสดง generations */}
                        <Column 
                            field="generationName" 
                            header="ແຮງຈັກ" 
                            sortable 
                            body={generationBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column 
                            field="category" 
                            header="ປີນຳໃຊ້" 
                            sortable 
                            body={categoryBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column 
                            field="category" 
                            header="ພາກສ່ວນນຳໃຊ້" 
                            sortable 
                            body={categoryBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column 
                            field="category" 
                            header="ປະເພດເຊົ່າລົດ" 
                            sortable 
                            body={categoryBodyTemplate} 
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
                        visible={generationDialog} 
                        style={{ width: '450px' }} 
                        header="ລາຍລະອຽດຂໍ້ມູນພະແນກ/ສາຂາ" 
                        modal 
                        className="p-fluid" 
                        footer={generationDialogFooter} 
                        onHide={hideDialog}
                    >
                        <div className="field">
                            <label htmlFor="category" className="font-bold">
                                ຊື່ຝ່າຍ <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                id="category"
                                value={generation.category}
                                options={departments}
                                onChange={onCategoryChange}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="ເລືອກຊື່ຝ່າຍ"
                                className={classNames({
                                    'p-invalid': submitted && !generation.category
                                })}
                            />
                            {submitted && !generation.category && (
                                <small className="p-invalid text-red-500">ກະລຸນາເລືອກຊື່ຝ່າຍ</small>
                            )}
                        </div>
                        <div className="field">
                            <label htmlFor="category" className="font-bold">
                                ພະແນກ/ສາຂາ/ຫ້ອງການ <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                id="category"
                                value={generation.category}
                                options={departments}
                                onChange={onCategoryChange}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="ເລືອກຊື່ຝ່າຍ"
                                className={classNames({
                                    'p-invalid': submitted && !generation.category
                                })}
                            />
                            {submitted && !generation.category && (
                                <small className="p-invalid text-red-500">ກະລຸນາເລືອກຊື່ຝ່າຍ</small>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                ອີເມວ <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={generation.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                placeholder="ກະລຸນາປ້ອນອີເມວ (ເຊັ່ນ: example@gmail.com )"
                                className={classNames({
                                    'p-invalid': submitted && !generation.name
                                })}
                            />
                            {submitted && !generation.name && (
                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນອີເມວ</small>
                            )}
                        </div>
                        
                        <div className="field">
                            <label htmlFor="name" className="font-bold">
                                ລະຫັດຜ່ານ <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={generation.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານ"
                                className={classNames({
                                    'p-invalid': submitted && !generation.name
                                })}
                            />
                            {submitted && !generation.name && (
                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນອີເມວ</small>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="category" className="font-bold">
                                ພະແນກ/ສາຂາ/ຫ້ອງການ <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                id="category"
                                value={generation.category}
                                options={departments}
                                onChange={onCategoryChange}
                                optionLabel="name"
                                optionValue="name"
                                placeholder="ສະຖານະຜູ້ໃຊ້"
                                className={classNames({
                                    'p-invalid': submitted && !generation.category
                                })}
                            />
                            {submitted && !generation.category && (
                                <small className="p-invalid text-red-500">ກະລຸນາເລືອກສະຖານະຜູ້ໃຊ້</small>
                            )}
                        </div>

                    </Dialog>

                    {/* Delete Single Dialog */}
                    <Dialog 
                        visible={deleteGenerationDialog} 
                        style={{ width: '450px' }} 
                        header="ການຢືນຢັນ" 
                        modal 
                        footer={deleteGenerationDialogFooter} 
                        onHide={hideDeleteGenerationDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {generation && (
                                <span>
                                    ທ່ານຕ້ອງການລົບ <b>{generation.name}</b> ແທ້ບໍ?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    {/* Delete Multiple Dialog */}
                    <Dialog 
                        visible={deleteGenerationsDialog} 
                        style={{ width: '450px' }} 
                        header="ການຢືນຢັນ" 
                        modal 
                        footer={deleteGenerationsDialogFooter} 
                        onHide={hideDeleteGenerationsDialog}
                    >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {generation && (
                                <span>ທ່ານຕ້ອງການລົບລາຍການທີ່ເລືອກທັງໝົດແທ້ບໍ?</span>
                            )}
                        </div>
                    </Dialog>

                    {/* Change Password Dialog */}
                    <Dialog 
                        visible={changePasswordDialog} 
                        style={{ width: '450px' }} 
                        header="ປ່ຽນລະຫັດຜ່ານ" 
                        modal 
                        className="p-fluid" 
                        footer={changePasswordDialogFooter} 
                        onHide={hideChangePasswordDialog}
                    >

                        <div className="field">
                            <label htmlFor="newPassword" className="font-bold">
                                ລະຫັດຜ່ານໃໝ່ <span className="text-red-500">*</span>
                            </label>
                            <Password
                                id="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່"
                                toggleMask
                                feedback={false}
                                className={classNames({
                                    'p-invalid': submitted && !newPassword
                                })}
                            />
                            {submitted && !newPassword && (
                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນລະຫັດຜ່ານໃໝ່</small>
                            )}
                        </div>

                        <div className="field">
                            <label htmlFor="confirmPassword" className="font-bold">
                                ຢືນຢັນລະຫັດຜ່ານໃໝ່ <span className="text-red-500">*</span>
                            </label>
                            <Password
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="ກະລຸນາຢືນຢັນລະຫັດຜ່ານໃໝ່"
                                toggleMask
                                feedback={false}
                                className={classNames({
                                    'p-invalid': submitted && !confirmPassword
                                })}
                            />
                            {submitted && !confirmPassword && (
                                <small className="p-invalid text-red-500">ກະລຸນາຢືນຢັນລະຫັດຜ່ານໃໝ່</small>
                            )}
                            {submitted && newPassword && confirmPassword && newPassword !== confirmPassword && (
                                <small className="p-invalid text-red-500">ລະຫັດຜ່ານບໍ່ກົງກັນ</small>
                            )}
                        </div>
                    </Dialog>

                    {/* Print Dialog */}
                    <Dialog 
                        visible={printDialog} 
                        style={{ width: '600px' }} 
                        header="ເລືອກລາຍງານ" 
                        modal 
                        className="p-fluid"
                        onHide={hidePrintDialog}
                        footer={
                            <div>
                                <Button 
                                    label="ປິດອອກ" 
                                    icon="pi pi-times" 
                                    className="p-button-text" 
                                    onClick={hidePrintDialog} 
                                />
                                <Button 
                                    label="ພິມລາຍງານທັ້ງໝົດ" 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    onClick={handlePrint} 
                                />
                            </div>
                        }
                    >
                        {/* ປະເພດລົດ */}
                        <div className="field">
                            <label htmlFor="carType" className="font-bold">
                                ປະເພດລົດ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="carType"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={[
                                        { label: 'ລົດ 4 ລໍ້', value: 'car4' },
                                        { label: 'ລົດ 6 ລໍ້', value: 'car6' },
                                        { label: 'ລົດ 10 ລໍ້', value: 'car10' }
                                    ]}
                                    optionLabel="label"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ຍີ່ຫໍລົດ */}
                        <div className="field">
                            <label htmlFor="carBrand" className="font-bold">
                                ຍີ່ຫໍລົດ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="carBrand"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={[
                                        { label: 'Toyota', value: 'toyota' },
                                        { label: 'Honda', value: 'honda' },
                                        { label: 'Nissan', value: 'nissan' }
                                    ]}
                                    optionLabel="label"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ລຸ້ນລົດ */}
                        <div className="field">
                            <label htmlFor="carModel" className="font-bold">
                                ລຸ້ນລົດ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="carModel"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={[
                                        { label: 'Camry', value: 'camry' },
                                        { label: 'Corolla', value: 'corolla' },
                                        { label: 'Vios', value: 'vios' }
                                    ]}
                                    optionLabel="label"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ປີພະລິດ */}
                        <div className="field">
                            <label htmlFor="yearProduced" className="font-bold">
                                ປີພະລິດ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="yearProduced"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={[
                                        { label: '2024', value: '2024' },
                                        { label: '2023', value: '2023' },
                                        { label: '2022', value: '2022' }
                                    ]}
                                    optionLabel="label"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ປະເພດເຊົ່າລົດ */}
                        <div className="field">
                            <label htmlFor="rentType" className="font-bold">
                                ປະເພດເຊົ່າລົດ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="rentType"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={[
                                        { label: 'ເຊົ່າລາຍວັນ', value: 'daily' },
                                        { label: 'ເຊົ່າລາຍເດືອນ', value: 'monthly' },
                                        { label: 'ເຊົ່າລາຍປີ', value: 'yearly' }
                                    ]}
                                    optionLabel="label"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ວັນທີ່ເລີ່ມເຊົ່າ - ວັນທີ່ສິ້ນສຸດ */}
                        <div className="field">
                            <label className="font-bold">
                                ຈາກວັນທີ່ເຊົ່າ - ຫາວັນທີ່ເຊົ່າ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <InputText 
                                    type="date"
                                    placeholder="dd/mm/yyyy"
                                    className="flex-1"
                                />
                                <InputText 
                                    type="date"
                                    placeholder="dd/mm/yyyy"
                                    className="flex-1"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ພະແນກວຽນທີ່ຢູ່ສົດ (ຝ່າຍ) */}
                        <div className="field">
                            <label htmlFor="department" className="font-bold">
                                ພາກສ່ວນນຳໃຊ້ລົດ (ຝ່າຍ)
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="department"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={departments}
                                    optionLabel="name"
                                    optionValue="name"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>

                        {/* ຊື່ເຈົ້າໜ້າທີ່ປະຈຳລົດ */}
                        <div className="field mb-0">
                            <label htmlFor="staff" className="font-bold">
                                ຊື່ເຈົ້າ
                            </label>
                            <div className="flex align-items-center gap-2">
                                <Dropdown
                                    id="staff"
                                    placeholder="ກະລຸນາເລືອກ"
                                    className="flex-1"
                                    options={[
                                        { label: 'ພະນັກງານ 1', value: 'staff1' },
                                        { label: 'ພະນັກງານ 2', value: 'staff2' },
                                        { label: 'ພະນັກງານ 3', value: 'staff3' }
                                    ]}
                                    optionLabel="label"
                                />
                                <Button 
                                    icon="pi pi-print" 
                                    className="p-button-danger" 
                                    style={{ width: '100px' }}
                                    label="ກົດພິມ"
                                />
                            </div>
                        </div>
                    </Dialog>


                </div>
            </div>
        </div>
    );
};

export default CarGenerationPage;