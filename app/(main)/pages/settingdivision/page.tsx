/* eslint-disable @next/next/no-img-element */
'use client';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { Demo } from '@/types';

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
    const [generationDialog, setGenerationDialog] = useState(false);
    const [deleteGenerationDialog, setDeleteGenerationDialog] = useState(false);
    const [deleteGenerationsDialog, setDeleteGenerationsDialog] = useState(false);
    const [generation, setGeneration] = useState<Demo.Product>(emptyGeneration);
    const [selectedGenerations, setSelectedGenerations] = useState<Demo.Product[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);

    // Load data on component mount
    useEffect(() => {
        // Load generations data
        fetch('/demo/data/generations.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => setGenerations(d.data as Demo.Product[]))
            .catch((err) => console.error('Error loading generations:', err));

        // Load departments data for dropdown AND table display
        fetch('/demo/data/departments.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => setDepartments(d.data as Demo.Product[]))
            .catch((err) => console.error('Error loading departments:', err));
    }, []);

    const openNew = () => {
        setGeneration(emptyGeneration);
        setSubmitted(false);
        setGenerationDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setGenerationDialog(false);
    };

    const hideDeleteGenerationDialog = () => {
        setDeleteGenerationDialog(false);
    };

    const hideDeleteGenerationsDialog = () => {
        setDeleteGenerationsDialog(false);
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
    const codeBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">ລະຫັດ</span>
                {rowData.code}
            </>
        );
    };

    const nameBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">ຊື່ຝ່າຍ</span>
                {rowData.name}
            </>
        );
    };

    const categoryBodyTemplate = (rowData: Demo.Product) => {
        return (
            <>
                <span className="p-column-title">ປະເພດ</span>
                {rowData.category}
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
                    onClick={() => editGeneration(rowData)} 
                />
                <Button 
                    icon="pi pi-trash" 
                    rounded 
                    severity="warning" 
                    onClick={() => confirmDeleteGeneration(rowData)} 
                />
            </>
        );
    };

    const generationDialogFooter = (
        <>
            <Button label="ຍົກເລີກ" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="ບັນທຶກ" icon="pi pi-check" text onClick={saveGeneration} />
        </>
    );

    const deleteGenerationDialogFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteGenerationDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteGeneration} />
        </>
    );

    const deleteGenerationsDialogFooter = (
        <>
            <Button label="ບໍ່" icon="pi pi-times" text onClick={hideDeleteGenerationsDialog} />
            <Button label="ແມ່ນ" icon="pi pi-check" text onClick={deleteSelectedGenerations} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />

                    {/* Title */}
                    <div className="flex justify-content-center pb-4 mb-3 border-bottom-1 border-gray-200">
                        <h1 className="m-0 text-blue-800">ຂໍ້ມູນພາກສ່ວນນຳໃຊ້(ພະແນກ/ສາຂາ)</h1>
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

                    {/* DataTable - CHANGED TO DISPLAY DEPARTMENTS */}
                    <DataTable
                        ref={dt}
                        value={departments}
                        selection={selectedGenerations}
                        onSelectionChange={(e) => setSelectedGenerations(e.value as Demo.Product[])}
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
                            header="ພາກສ່ວນນຳໃຊ້ (ຝ່າຍ)" 
                            sortable 
                            body={nameBodyTemplate} 
                            headerStyle={{ minWidth: '15rem', fontSize: '1.5rem' }}
                        ></Column>
                        <Column 
                            field="category" 
                            header="ພາກສ່ວນນຳໃຊ້ (ພະແນກ/ສາຂາ)" 
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
                            <label htmlFor="name" className="font-bold">
                                ຊື່ພະແນກ/ສາຂາ <span className="text-red-500">*</span>
                            </label>
                            <InputText
                                id="name"
                                value={generation.name}
                                onChange={(e) => onInputChange(e, 'name')}
                                required
                                autoFocus
                                placeholder="ກະລຸນາປ້ອນຊື່ພະແນກ/ສາຂາ (ເຊັ່ນ: Camry 2024)"
                                className={classNames({
                                    'p-invalid': submitted && !generation.name
                                })}
                            />
                            {submitted && !generation.name && (
                                <small className="p-invalid text-red-500">ກະລຸນາປ້ອນຊື່ພະແນກ/ສາຂາ</small>
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
                </div>
            </div>
        </div>
    );
};

export default CarGenerationPage;